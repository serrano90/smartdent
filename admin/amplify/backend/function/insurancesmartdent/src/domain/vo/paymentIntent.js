/**
 * Invoices ValueObject
 */
const t = require('tcomb')

const PaymentIntent = t.struct({
	idFlow: t.Number,
	subject: t.String,
	createdAt: t.String,
	amountOriginal: t.maybe(t.String),
    currencyOriginal: t.maybe(t.String),
    paymentDate: t.maybe(t.String),
    amountFinaly: t.maybe(t.String),
	currencyFinaly: t.maybe(t.String),
	status: t.Number,
}, "PaymentIntent")

module.exports = PaymentIntent