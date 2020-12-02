/**
 * SubscriptionHTTPService
 */
const {InternalServerErrorException} = require("../../error")
const {
	toSubscriptionEntity,
	toSubscriptionEntityWithoutPlan,
	toSubscriptionWithInviceEntity
} = require("./transform")

class SubscriptionHTTPService {
	/**
	 *
	 */
	constructor({flowCL}) {
		this.flowClient = flowCL
	}

	/**
	 * Create a new subcriptions
	 *
	 * @param {string} customerId
	 * @param {string} planId
	 */
	async create(customerId, planId) {
		const body = {
			customerId: customerId,
			planId: planId
		}
		try {
			const resp = await this.flowClient.send(
				"subscription/create",
				body,
				"POST"
			)
			console.log(resp)
			return toSubscriptionEntity(resp)
		} catch (error) {
			console.log(error)
			throw new InternalServerErrorException()
		}
	}

	/**
	 * Delete a subcription
	 *
	 * @param {string} subcriptionId
	 */
	async delete(subcriptionId) {
		const body = {
			subscriptionId: subcriptionId,
			at_period_end: 1
		}
		try {
			const resp = await this.flowClient.send(
				"subscription/cancel",
				body,
				"POST"
			)
			return toSubscriptionEntity(resp)
		} catch (error) {
			console.log(error)
			throw new InternalServerErrorException()
		}
	}

	/**
	 * Get subscriptions by subscriptionsId
	 *
	 * @param {string} subcriptionId
	 */
	async readById(subcriptionId) {
		const body = {
			subscriptionId: subcriptionId
		}
		try {
			const resp = await this.flowClient.send("subscription/get", body, "GET")
			return toSubscriptionWithInviceEntity(resp)
		} catch (error) {
			console.log(error)
			throw new InternalServerErrorException()
		}
	}

	/**
	 * Get a first active subscriptions
	 *
	 * @param {string} planId
	 */
	async readFirstActiveSubscriptionByPlanAndCustomerFullName(
		planId,
		customerFullName
	) {
		const body = {
			planId: planId,
			filter: customerFullName,
			status: 1
		}

		try {
			const resp = await this.flowClient.send("subscription/list", body, "GET")
			if (resp.total === 0) {
				return null
			}
			console.log(resp)
			return toSubscriptionEntityWithoutPlan(resp.data[0])
		} catch (error) {
			console.log(error)
			throw new InternalServerErrorException()
		}
	}
}

module.exports = SubscriptionHTTPService
