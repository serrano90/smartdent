/**
 * Subcription Entity
 */
const t = require('tcomb')

const Subscription = t.struct({
    id: t.String,
    planId: t.maybe(t.String),
    plan: t.maybe(t.String),
    subscriptionStart: t.String,
    subscriptionEnd: t.maybe(t.String),
    nextInvoiceDate: t.maybe(t.String),
    status: t.Number,
    morose: t.Number,
    createdAt: t.String,
}, "Subcription")

module.exports = Subscription