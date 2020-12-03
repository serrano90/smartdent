/**
 * PaymentService
 */
import HTTPClient from "packages/http/http"
import resources from "./resources"

export default class PaymentService {
	/**
	 * Payment Service
	 */
	constructor() {
		if (!PaymentService.instance) {
			this.client = new HTTPClient()
			PaymentService.instance = this
		}
		return PaymentService.instance
	}

	/**
	 * Add card
	 */
	addCard = (customerId, isAdmin = false) => {
		return this.client.post(resources.PAYMENT.ADD_CARD.PATH, {
			customerId: customerId,
			isAdmin: isAdmin
		})
	}

	/**
	 * getStatus
	 */
	getStatus = (token) => {
		return this.client.get(resources.PAYMENT.GET_STATUS_CARD.PATH, {
			params: {
				token: token
			}
		})
	}

	/**
	 * Unregister Card
	 * @param {*} id 
	 */
	unRegisterCard = (id) => {
		return this.client.post(resources.PAYMENT.REMOVE_CARD.PATH, {
			id: id
		})
	}

	/**
	 * Send mail for update card
	 */
	sendEmailToRegisterCard = (id) => {
		return this.client.post(resources.PAYMENT.UPDATE_REGISTER_CARD.PATH, {
			id: id
		})
	}
}
