/**
 * Payments Service
 */
const {Customer} = require("../domain/entity")
const {
	DoesNotExistCustomerException,
	DoesNotPossibleSendEmailException
} = require("../infrastructure/error")

class PaymentService {
	/**
	 *
	 */
	constructor({
		paymentHttpService,
		paymentRepository,
		customerRepository,
		mailService
	}) {
		this.paymentHttpService = paymentHttpService
		this.paymentRepository = paymentRepository
		this.customerRepository = customerRepository
		this.mailService = mailService
	}

	/**
	 * Add a new credit Card
	 *
	 * @param {object} input
	 */
	async addCard(input) {
		if (input.isAdmin) {
			// Get Customer
			let customer = await this.customerRepository.readByCustomerId(
				input.customerId
			)

			if (customer === null) {
				throw new DoesNotExistCustomerException(
					"No existe ningun clientes con el siguiente Id"
				)
			}

			const card = await this.paymentHttpService.createCard(
				input.customerId,
				input.isAdmin,
				customer.id
			)

			await this.paymentRepository.createCardRegisterIntent(
				customer.id,
				card.token
			)

			return card
		}
		return this.paymentHttpService.createCard(input.customerId)
	}

	/**
	 * Update the register card
	 * 
	 * @param {*} id
	 */
	async updateCardByEmail(id) {
		// Get customer id
		const customer = await this.customerRepository.readById(id)
		if (customer === null) {
			throw new DoesNotExistCustomerException(
				"No existe ningun clientes con el siguiente Id"
			)
		}
		// Change payment card
		const card = await this.paymentHttpService.changeCard(customer)

		// Send email for change the new card
		const mailSender = await this.mailService.sendToRegisterCard(customer.email, {
			fullName: customer.getFullName(),
			url: `${card.url}?token=${card.token}`,
			year: new Date().getFullYear()
		})

		// Check if mail doesn't possible to sending
		if (!mailSender) {
			throw new DoesNotPossibleSendEmailException(
				"El email no ha podido ser enviado"
			)
		}

		await this.paymentRepository.createCardRegisterIntent(
			customer.id,
			card.token
		)

		return null
	}

	/**
	 * Remove the credit Card
	 *
	 * @param {*} id
	 */
	async removeCard(id) {
		// Get Customer Details
		let customer = await this.customerRepository.readById(id)

		if (customer === null) {
			throw new DoesNotExistCustomerException(
				"No existe ningun clientes con el siguiente Id"
			)
		}

		await this.paymentHttpService.cardUnRegister(customer.flowCustomerId)

		// Update customer data
		customer = Customer.update(customer, {
			card: {$set: null}
		})

		//Database update
		await this.customerRepository.update(customer)

		return null
	}

	/**
	 * Get status card register
	 *
	 * @param {string} token
	 */
	async getStatusCardRegister(token) {
		const cardResponse = await this.paymentHttpService.getStatusCardRegister(
			token
		)
		// Get Customer
		let customer = await this.customerRepository.readByCustomerId(
			cardResponse.customerId
		)

		if (customer !== null) {
			// Update customer data
			customer = Customer.update(customer, {
				card: {$set: cardResponse},
				subscription: {$set: null}
			})
			await this.customerRepository.update(customer)
		}

		return cardResponse
	}

	/**
	 * Get status card register by customer id
	 */
	async getUpdateStatusCardRegister(id) {
		// Get Customer
		let customer = await this.customerRepository.readById(id)

		if (customer === null) {
			throw new DoesNotExistCustomerException(
				"No existe ningun clientes con el siguiente Id"
			)
		}

		const paymentIntent = await this.paymentRepository.readCardRegisterIntentById(
			id
		)

		if (paymentIntent === null) {
			throw new DoesNotExistCustomerException(
				"No existe ningun intento de registro de tarjeta para este usuario"
			)
		}

		// get status payment
		const cardResponse = await this.paymentHttpService.getStatusCardRegister(
			paymentIntent.token
		)

		console.log(cardResponse)

		// Update customer data
		customer = Customer.update(customer, {
			card: {$set: cardResponse},
			subscription: {$set: customer.subscription}
		})
		await this.customerRepository.update(customer)

		// Remove payment intent
		await this.paymentRepository.deleteCardRegisterIntent(id)

		return customer
	}
}

module.exports = PaymentService
