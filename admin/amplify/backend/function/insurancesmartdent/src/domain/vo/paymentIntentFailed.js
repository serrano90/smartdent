/**
 * Invoices ValueObject
 */
const t = require('tcomb')

const PaymentIntentFailed = t.struct({
    id: t.Number,
    invoiceId: t.String,
	createdAt: t.String,
	amount: t.Number,
    currency: t.String,
    errorCode: t.maybe(t.String),
    errorDescription: t.maybe(t.String),
}, "PaymentIntentFailed")

module.exports = PaymentIntentFailed