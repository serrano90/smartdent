/**
 * Card ValueObject
 */
const t = require('tcomb')

const Card = t.struct({
	customerId: t.String,
	last4CardDigits: t.String,
	creditCardType: t.String,
	status: t.Boolean
}, "Card")

module.exports = Card