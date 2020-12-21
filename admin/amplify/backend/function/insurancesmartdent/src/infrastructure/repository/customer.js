/**
 * Define a CustomerRepository
 */

const {InternalServerErrorException} = require("../error")
const {toCustomerEntity, arrayToCustomerEntityArray} = require("./transform")

class CustomerRepository {
	/**
	 * Create a new instance for Customer repository
	 */
	constructor({config, db}) {
		this.dynamoDBClient = db
		let tableName =
			"Customer" +
			(config.app.env && config.app.env !== "NONE"
				? "-" + (config.app.env === "local" ? "dev" : config.app.env)
				: config.app.env)
		this.tableName = tableName
	}

	/**
	 * Save a new customer
	 *
	 * @param {*} customer
	 */
	async create(customer) {
		const timestamp = new Date().toISOString()
		let params = {
			TableName: this.tableName,
			Item: {
				...customer,
				createdAt: timestamp,
				updatedAt: timestamp
			}
		}
		try {
			let result = await this.dynamoDBClient.put(params).promise()
			return result
		} catch (err) {
			console.log(err)
			throw new InternalServerErrorException()
		}
	}

	/**
	 * Get all customer with page
	 * @param {string} filter
	 * @param {int} page 
	 */
	async readAll(filter, status) {
		let params = {
			TableName: this.tableName,
			Limit: 2000,
		}

		if (filter && filter != null && filter != "") {
			params = {
				...params,
				KeyConditionExpression: "contains(#name, :filterName) OR contains(#lastName, :filterLastName)",
				ExpressionAttributeNames: {
					"#name": "name",
					"#lastName": "lastName",
				},
				ExpressionAttributeValues: {
					":filterName": filter,
					":filterLastName": filter
				}
			}
		}

		try {
			const result = await this.dynamoDBClient.scan(params).promise()
			if (result.Count == 0) {
				return []
			}
			return arrayToCustomerEntityArray(result.Items)
		} catch (err) {
			console.log(err)
			return []
		}
	}

	/**
	 * Get customer by Id
	 *
	 * @param {string} id
	 */
	async readById(id) {
		let params = {
			TableName: this.tableName,
			KeyConditionExpression: "#id = :id",
			ExpressionAttributeNames: {
				"#id": "id"
			},
			ExpressionAttributeValues: {
				":id": id
			}
		}
		try {
			let result = await this.dynamoDBClient.query(params).promise()
			if (result.Count === 0) {
				return null
			}
			return toCustomerEntity(result.Items[0])
		} catch (err) {
			console.log(err)
			throw new InternalServerErrorException()
		}
	}

	/**
	 * Get customer by RUT
	 *
	 * @param {string} rut
	 */
	async readByRut(rut) {
		let params = {
			TableName: this.tableName,
			IndexName: "rut",
			KeyConditionExpression: "#rut = :rut",
			ExpressionAttributeNames: {
				"#rut": "rut"
			},
			ExpressionAttributeValues: {
				":rut": rut
			}
		}

		try {
			let result = await this.dynamoDBClient.query(params).promise()
			if (result.Count === 0) {
				return null
			}
			return toCustomerEntity(result.Items[0])
		} catch (err) {
			console.log(err)
			throw new InternalServerErrorException()
		}
	}

	/**
	 * Get customer by Flow.CL customerId
	 *
	 * @param {string} customerId
	 */
	async readByCustomerId(customerId) {
		let params = {
			TableName: this.tableName,
			IndexName: "flowCustomerId",
			KeyConditionExpression: "#flowCustomerId = :flowCustomerId",
			ExpressionAttributeNames: {
				"#flowCustomerId": "flowCustomerId"
			},
			ExpressionAttributeValues: {
				":flowCustomerId": customerId
			}
		}

		try {
			let result = await this.dynamoDBClient.query(params).promise()
			if (result.Count === 0) {
				return null
			}
			return toCustomerEntity(result.Items[0])
		} catch (err) {
			console.log(err)
			throw new InternalServerErrorException()
		}
	}

	/**
	 * Get all morose customer
	 * @param {*} customer 
	 */
	async getAllCustomerWithMoroseSubscription(morose = 1) {
		let params = {
			TableName: this.tableName,
			ProjectionExpression: "id",
			FilterExpression: "subscription <> :null AND subscription.morose = :morose",
			ExpressionAttributeValues: {
				":morose": morose,
				":null": null
			}
		}

		try {
			let result = await this.dynamoDBClient.scan(params).promise()
			
			return result.Count
		} catch (err) {
			console.log(err)
			throw new InternalServerErrorException()
		}
	}

	/**
	 * Get all customer with status subscriptions active
	 * @param {*} customer 
	 */
	async getAllCustomerWithStatusSubscription(status = 1) {
		let params = {
			TableName: this.tableName,
			ProjectionExpression: "id",
			FilterExpression: "subscription <> :null AND subscription.#s = :status",
			ExpressionAttributeValues: {
				":status": status,
				":null": null
			},
			ExpressionAttributeNames: {
				"#s": "status"
			}
		}

		try {
			let result = await this.dynamoDBClient.scan(params).promise()
			
			return result.Count
		} catch (err) {
			console.log(err)
			throw new InternalServerErrorException()
		}
	}

	/**
	 * Update subcription data
	 *
	 * @param {string} id
	 * @param {Subscription} subscriptions
	 */
	async update(customer) {
		const timestamp = new Date().toISOString()
		let params = {
			TableName: this.tableName,
			Key: {
				"id": customer.id,
			},
			ExpressionAttributeNames: {
				"#n": "name",
				"#s": "status"
			},
			UpdateExpression:
				"set rut = :rut, #n = :n, lastName = :lastName, email = :email, flowCustomerId = :flowCustomerId, #s = :s, subscription = :subscription, card = :card, updatedAt = :updatedAt",
			ExpressionAttributeValues: {
				":n": customer.name,
				":lastName": customer.lastName,
				":rut": customer.rut,
				":email": customer.email,
				":s": customer.status,
				":flowCustomerId": customer.flowCustomerId,
				":card": customer.card,
				":subscription": customer.subscription,
				":updatedAt": timestamp
			},
			ReturnValues:"UPDATED_NEW"
		}

		try {
			let result = await this.dynamoDBClient.update(params).promise()
			return result
		} catch (err) {
			console.log(err)
			throw new InternalServerErrorException()
		}
	}
}

module.exports = CustomerRepository
