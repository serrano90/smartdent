/**
 * Plan Entity
 */
const t = require('tcomb')

const Plan = t.struct({
    planId: t.String,
    name: t.String,
    currency: t.String,
    amount: t.String,
    interval: t.Number,
    descriptions: t.maybe(t.Array)
}, "Plan")

module.exports = Plan