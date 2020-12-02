/**
 * Payment Transform
 * 
 */

const { Card, PaymentIntent, PaymentIntentFailed } = require("../../../domain/vo")

const toCardEntity = function(resp) {
    return Card({
        customerId: resp.customerId,
        last4CardDigits: resp.last4CardDigits,
        creditCardType: resp.creditCardType,
        status: resp.status === '1'
    })
} 

const toPaymentIntent = function(resp) {
    return PaymentIntent({
        idFlow: resp.flowOrder,
	    subject: resp.subject,
	    createdAt: resp.requestDate,
	    amountOriginal: resp.amount,
        currencyOriginal: resp.currency,
        status: resp.status,
        paymentDate: resp.paymentData !== null ? resp.paymentData.date : "-",
        amountFinaly: resp.paymentData !== null ? resp.paymentData.amount : "-",
	    currencyFinaly: resp.paymentData !== null ? resp.paymentData.currency : "-",
    })
}

const toPaymentIntentFailed = function(resp) {
    return PaymentIntentFailed({
        id: resp.flowOrder,
        invoiceId: resp.invoiceId,
        createdAt: resp.date,
        amount: resp.amount,
        currency: resp.currency,
        errorCode: resp.errorCode,
        errorDescription: resp.errorDescription,
    })
}

module.exports = {
    toCardEntity,
    toPaymentIntent,
    toPaymentIntentFailed
}