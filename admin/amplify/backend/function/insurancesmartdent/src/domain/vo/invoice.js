/**
 * Invoices ValueObject
 */
const t = require('tcomb')

const Invoice = t.struct({
	id: t.Number,
	subject: t.String,
	createdAt: t.String,
	amount: t.String,
	currency: t.String,
	status: t.Number,
	paymentIntentCount: t.maybe(t.Number),
	nextPaymentIntent: t.maybe(t.String),
	dueDate: t.maybe(t.String)
}, "Card")

module.exports = Invoice