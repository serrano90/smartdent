/**
 * CustomerHTTPService client for connet with flowcl customer API
 */
const {
	InternalServerErrorException
} = require("../../error")
const {transformPaginations} = require("../../utils/paginations")
const {toCustomerEntityBasicData} = require("./transform")

class CustomerHTTPService {
	constructor({flowCL, config}) {
		this.flowClient = flowCL
		this.registerByPage = config.flowCL.registerByPage
	}

	async create(customer) {
		const body = {
			name: customer.getFullName(),
			email: customer.email,
			externalId: customer.id
		}
		try {
			const resp = await this.flowClient.send("customer/create", body, "POST")
			return resp
		} catch (error) {
			console.log(error)
			throw new InternalServerErrorException()
		}
	}

	/**
	 * Update customer
	 * 
	 * @param {object} customer 
	 */
	async update(customer) {
		const body = {
			customerId: customer.flowCustomerId,
			name: customer.getFullName(),
			email: customer.email,
			externalId: customer.id
		}
		try {
			const resp = await this.flowClient.send("customer/edit", body, "POST")
			return resp
		} catch (error) {
			console.log(error)
			throw new InternalServerErrorException()
		}
	}

	/**
	 * Get all customer
	 * 
	 * @param {string} filter 
	 * @param {number} page 
	 * @param {bool} status 
	 */
	async getAll(filter, page = 1, status) {
		let params = {}
		if (page) {
			params.start = (parseInt(page) - 1) * this.registerByPage 
		}

		if (filter) {
			params.filter = filter
		}

		if (status) {
			params.status = status ? 1 : 0
		}

		try {
			const resp = await this.flowClient.send("customer/list", params, "GET")
			let arr = new Array()
			if(resp.total > 0) {
				resp.data.map((item) => {
					arr.push(toCustomerEntityBasicData(item))
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

module.exports = CustomerHTTPService
