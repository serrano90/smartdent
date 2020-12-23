/**
 * Plans Transform
 *
 */

const {Customer} = require("../../domain/entity")

const toCustomerEntity = Customer

const arrayToCustomerEntityArray = (arr) => {
	let result = []
	result = arr.map((val) => {
        console.log(val)
		return toCustomerEntity(val)
	})
	return result
}

module.exports = {
	toCustomerEntity,
	arrayToCustomerEntityArray
}
