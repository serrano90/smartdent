/**
 * Payment Http Service Client
 */
const {toCardEntity, toPaymentIntent, toPaymentIntentFailed} = require("./transform")
const {transformPaginations} = require("../../utils/paginations")
const {
	InternalServerErrorException
} = require("../../error")

class PaymentHTTPService {
	constructor({config, flowCL}) {
		this.flowClient = flowCL
		let url = config.app.url
		this.registerByPage = config.flowCL.registerByPage
		if (config.app.env === "local" && (config.app.port === "5000" || config.app.port === "3000")) {
			url += ":"+config.app.port
		}
		this.urlRedirect = url
	}

	/**
	 * Add Card
	 *
	 * @param {string} customerId
	 * @param {bool} isAdmin
	 * @param {string} id
	 */
	async createCard(customerId, isAdmin, id) {
		const body = {
			customerId: customerId,
			url_return: `${this.urlRedirect}/v1/payments/${isAdmin ? "registerCardAdminComplete/"+id : "registerCardComplete"}`
		}
		// Payment Intent
		try {
			const resp = await this.flowClient.send("customer/register", body, "POST")
			return resp
		} catch (error) {
			console.log(error)
			throw new InternalServerErrorException()
		}
	}

	/**
	 * Change your credit or debit card
	 * 
	 * @param {*} customer
	 */
	async changeCard(customer) {
		const body = {
			customerId: customer.flowCustomerId,
			url_return: `${this.urlRedirect}/v1/payments/updateCardComplete?id=${customer.id}`
		}
		// Payment Intent
		try {
			const resp = await this.flowClient.send("customer/register", body, "POST")
			return resp
		} catch (error) {
			console.log(error)
			throw new InternalServerErrorException()
		}
	}

	/**
	 * Remove Card
	 * 
	 * @param {string} customerId 
	 */
	async cardUnRegister(customerId) {
		const body = {
			customerId: customerId,
		}
		try {
			const resp = await this.flowClient.send("customer/unRegister", body, "POST")
			return resp
		} catch (error) {
			console.log(error)
			throw new InternalServerErrorException()
		}
	}

	/**
	 * Get Status Card Register
	 *
	 * @param {string} token
	 */
	async getStatusCardRegister(token) {
		try {
			const resp = await this.flowClient.send(
				"customer/getRegisterStatus",
				{token: token},
				"GET"
			)
            const card = toCardEntity(resp)
			return card
		} catch (error) {
			console.log(error)
			throw new InternalServerErrorException()
		}
	}

	/**
	 * Get All Payment Success By Customer
	 */
	async getAllPaymentIntentByCustomer(customerId, page) {
		try {
			const resp = await this.flowClient.send(
				"customer/getCharges",
				{
					customerId: customerId,
					start: (parseInt(page) - 1) * this.registerByPage,
				},
				"GET"
			)

            let arr = new Array()
			if(resp.total > 0) {
				resp.data.map((item) => {
					arr.push(toPaymentIntent(item))
				})
			}

			return {
				data: arr,
				...transformPaginations(resp.total, page)
			}
		} catch (error) {
			console.log(error)
			throw new InternalServerErrorException()
		}
	}

	/**
	 * Get All Payment Fail Intent By Customer
	 *
	 * @param {string} token
	 */
	async getAllPaymentIntentFailByCustomer(customerId, page = 1) {
		try {
			const resp = await this.flowClient.send(
				"customer/getChargeAttemps",
				{
					customerId: customerId,
					start: (parseInt(page) - 1) * this.registerByPage,
				},
				"GET"
			)
			
			let arr = new Array()
			if(resp.total > 0) {
				resp.data.map((item) => {
					arr.push(toPaymentIntentFailed(item))
				})
			}

			return {
				data: arr,
				...transformPaginations(resp.total, page)
			}
		} catch (error) {
			console.log(error)
			throw new InternalServerErrorException()
		}
	}

	
}

module.exports = PaymentHTTPService
