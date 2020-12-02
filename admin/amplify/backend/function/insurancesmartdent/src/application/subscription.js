/**
 * Subscription Service
 */

const {Customer, Subscription} = require("../domain/entity")
const {
	DoesNotExistCustomerException,
	TheCustomerHaveASubscriptionException,
	TheCustomerDontHaveASubscriptionException
} = require("../infrastructure/error")

class SubscriptionService {
	constructor({subscriptionHttpService, customerRepository, planHttpService}) {
		this.subscriptionHttpService = subscriptionHttpService
		this.customerRepository = customerRepository
		this.planHttpService = planHttpService
	}

	/**
	 * Create a new subscription
	 *
	 * @param {*} input
	 */
	async create(input) {
		let customer = await this.customerRepository.readByCustomerId(
			input.customerId
		)
		if (customer.subscription || customer.subscription !== null) {
			throw new TheCustomerHaveASubscriptionException(
				"El cliente tiene una subscricion vigente"
			)
		}

		const subscription = await this.subscriptionHttpService.create(
			input.customerId,
			input.planId
		)

		if (subscription !== null) {
			// Update customer data
			customer = Customer.update(customer, {
				subscription: {$set: subscription}
			})
			await this.customerRepository.update(customer)
		}

		return subscription
	}

	/**
	 * Delete subscription
	 *
	 * @param {*} customerId
	 */
	async delete(input) {
		// Get Customer Details
		let customer = await this.customerRepository.readByCustomerId(
			input.customerId
		)

		if (customer === null) {
			throw new DoesNotExistCustomerException(
				"No existe ningun clientes con el siguiente Id"
			)
		}

		if (customer.subscription === null) {
			throw new TheCustomerDontHaveASubscriptionException(
				"El cliente no tienen ninguna subcripcion creada"
			)
		}

		let subscription = await this.subscriptionHttpService.delete(
			customer.subscription.id
		)

		if (subscription !== null) {
			// Update customer data
			customer = Customer.update(customer, {
				subscription: {$set: subscription}
			})
			await this.customerRepository.update(customer)
		}

		return subscription
	}

	/**
	 * Update Subscriptions
	 *
	 * @param {*} customerId
	 */
	async update(customerId, byInternalCustomId = false) {
		// Get Customer Details
		let customer = null 
		if (!byInternalCustomId) {
			customer = await this.customerRepository.readByCustomerId(customerId)
		} else {
			customer = await this.customerRepository.readById(customerId)
		}

		if (customer === null) {
			throw new DoesNotExistCustomerException(
				"No existe ningun clientes con el siguiente Id"
			)
		}

		let subscription = null

		if (customer.subscription === null) {
			const plans = await this.planHttpService.getAll()
			for (const plan of plans) {
				subscription = await this.subscriptionHttpService.readFirstActiveSubscriptionByPlanAndCustomerFullName(
					plan.planId,
					customer.getFullName()
				)
				if (subscription != null) {
					subscription = Subscription.update(subscription, {
						planId: {$set: plan.planId},
						plan: {$set: plan.name}
					})
					break
				}
			}
		} else {
			subscription = await this.subscriptionHttpService.readById(
				customer.subscription.id
			)
		}

		if (subscription !== null) {
			// Update customer data
			customer = Customer.update(customer, {
				subscription: {$set: subscription}
			})
			await this.customerRepository.update(customer)
		}

		return null
	}
}

module.exports = SubscriptionService
