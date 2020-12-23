/**
 * PlansService
 */
import HTTPClient from "packages/http/http"
import resources from "./resources"

export default class CustomerService {
	/**
	 * Plans Service
	 */
	constructor() {
		if (!CustomerService.instance) {
			this.client = new HTTPClient()
			CustomerService.instance = this
		}
		return CustomerService.instance
	}

	/**
	 * Create Customer
	 */
	createCustomer = (body) => {
		return this.client.post(resources.CUSTOMER.CREATE_CUSTOMER.PATH, body)
	}

	/** 
	 * Update Customer
	*/
	updateCustomer = (id, body) => {
		return this.client.post(resources.CUSTOMER.UPDATE_CUSTOMER.PATH+"/"+id , body)
	}

	/**
	 * List Customer
	 */
	listCustomer = (filter, page, status) => {
		return this.client.get(resources.CUSTOMER.LIST_CUSTOMER.PATH, {
			params: {
				filter: filter,
				page: page,
				status: status
			}
		})
	}

	/**
	 * Customer Details
	 */
	getCustomer = (id) => {
		return this.client.get(resources.CUSTOMER.DETAILS_CUSTOMER.PATH+"/"+id)
	}

	/**
	 * Customer Delete
	 */
	deleteCustomer = (id) => {
		return this.client.delete(resources.CUSTOMER.DELETE_CUSTOMER.PATH+"/"+id)
	}

	/**
	 * Get All Payment Intent
	 */
	getAllPaymentIntent = (id, page) => {
		return this.client.get(resources.CUSTOMER.DETAILS_CUSTOMER.PATH+"/"+id+"/getAllPaymentIntent", {
			params: {
				page: page,
			}
		})
	}

	/**
	 * Get Charges Failed
	 */
	getAllChargeIntentFailed = (id, page) => {
		return this.client.get(resources.CUSTOMER.DETAILS_CUSTOMER.PATH+"/"+id+"/getAllChargeFailed", {
			params: {
				page: page,
			}
		})
	}
}
