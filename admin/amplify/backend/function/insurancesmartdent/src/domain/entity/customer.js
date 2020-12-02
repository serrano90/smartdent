/**
 * Customer Entity
 */
const t = require('tcomb')
const { Card } = require("../vo")
const Subscription = require("./subscription")

const Customer = t.struct({
	id: t.maybe(t.String),
	rut: t.String,
	name: t.String,
	lastName: t.String,
	email: t.String,
	flowCustomerId: t.maybe(t.String),
	status: t.maybe(t.Boolean),
	card: t.maybe(Card),
	subscription: t.maybe(Subscription)
}, "Customer")

//getFullName return a complete name for a customer
Customer.prototype.getFullName = function () {
	return `${this.name} ${this.lastName}`;
}

module.exports = Customer
