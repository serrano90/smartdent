/**
 * Define a PaymentRepository
 */

const {InternalServerErrorException} = require("../error")

class PaymentRepository {
	/**
	 * Create a new instance for Customer repository
	 */
	constructor({config, db}) {
		this.dynamoDBClient = db
		let tableName =
			"CardIntent" +
			(config.app.env && config.app.env !== "NONE"
				? "-" + (config.app.env === "local" ? "dev" : config.app.env)
				: "")
		this.tableName = tableName
	}

	/**
	 * Save a new customer
	 *
	 * @param {string} id
	 */
	async createCardRegisterIntent(id, token) {
		const timestamp = new Date().toISOString()
		let params = {
			TableName: this.tableName,
			Item: {
				id: id,
				token: token,
				createdAt: timestamp
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
	 * Get payment intent by customer id
	 *
	 * @param {string} id
	 */
	async readCardRegisterIntentById(id) {
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
			return result.Items[0]
		} catch (err) {
			console.log(err)
			throw new InternalServerErrorException()
		}
	}

	/**
	 * Remove payment intent by customer id
	 *
	 * @param {string} id
	 */
	async deleteCardRegisterIntent(id) {
		let params = {
			TableName: this.tableName,
			Key: {
				id: id
			},
			ConditionExpression: "id <= :val",
			ExpressionAttributeValues: {
				":val": id
			}
		}

		try {
			let result = await this.dynamoDBClient.delete(params).promise()
			console.log(result)
			return result
		} catch (err) {
			console.log(err)
			throw new InternalServerErrorException()
		}
	}
}

module.exports = PaymentRepository
