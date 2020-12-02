/**
 * Plans Transform
 *
 */

const {Subscription} = require("../../../domain/entity")
const {Invoice} = require("../../../domain/vo")

const toSubscriptionEntity = (data) => {
	return Subscription({
		id: data.subscriptionId,
		planId: data.planId,
		plan: data.plan_name,
		status: data.status,
		morose: data.morose,
		subscriptionStart: data.subscription_start,
		subscriptionEnd: data.subscription_end,
		nextInvoiceDate: data.next_invoice_date,
		createdAt: data.created
	})
}

const toSubscriptionEntityWithoutPlan = (data) => {
	return Subscription({
		id: data.subscriptionId,
		status: data.status,
		morose: data.morose,
		subscriptionStart: data.subscription_start,
		subscriptionEnd: data.subscription_end,
		nextInvoiceDate: data.next_invoice_date,
		createdAt: data.created
	})
}

const toInvoiceEntity = (data) => {
	return Invoice({
		id: data.id,
		subject: data.subject,
		createdAt: data.created,
		amount: data.amount,
		currency: data.currency,
		status: data.status,
		paymentIntentCount: data.attemp_count,
		nextPaymentIntent: data.next_attemp_date,
		dueDate: data.due_date
	})
}

const toSubscriptionWithInviceEntity = (data) => {
	let subscriptions = toSubscriptionEntity(data)
	let invoices = new Array()
	if (data.invoices !== null || data.invoices.length > 0) {
		data.invoices.forEach((item) => {
			invoices.push(toInvoiceEntity(item))
		})
	}

	const subscriptionsValue = {
		...subscriptions,
		invoices
	}

	return subscriptionsValue
}


module.exports = {
	toSubscriptionEntity,
	toSubscriptionEntityWithoutPlan,
	toSubscriptionWithInviceEntity
}
