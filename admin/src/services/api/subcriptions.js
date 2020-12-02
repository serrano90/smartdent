/**
 * SubcriptionsService
 */
import HTTPClient from "packages/http/http"
import resources from "./resources"

export default class SubcriptionsService {
	/**
	 * Plans Service
	 */
	constructor() {
		if (!SubcriptionsService.instance) {
			this.client = new HTTPClient()
			SubcriptionsService.instance = this
		}
		return SubcriptionsService.instance
	}

	/**
	 * Add Subcriptions
	 */
	addSubcriptions = (customerId, planId) => {
		return this.client.post(resources.SUBCRIPTIONS.CREATE.PATH, {
            customerId: customerId,
            planId: planId,
		})
	}

	/**
	 * Update Subscriptions
	 * @param {*} customerId 
	 */
	updateSubscription = (customerId) => {
		return this.client.post(resources.SUBCRIPTIONS.UPDATE.PATH, {
            customerId: customerId,
		})
	}

	/**
	 * Delete subscriptions
	 * 
	 * @param {*} customerId 
	 */
	deleteSubcriptions = (customerId) => {
		return this.client.post(resources.SUBCRIPTIONS.DELETE.PATH, {
            customerId: customerId,
		})
	}
}
