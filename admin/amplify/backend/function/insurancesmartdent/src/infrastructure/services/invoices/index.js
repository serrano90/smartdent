/**
 * InvoiceHTTPService client for connet with flowcl invoice API
 */
const {toSubscriptionEntity} = require("../subscription/transform")

class InvoiceHTTPService {
	constructor({flowCL}) {
		this.flowClient = flowCL
	}

	async retryPaymentIntent(invoiceId) {
		const body = {
			invoiceId: invoiceId
		}
		
		try {
			const resp = await this.flowClient.send(
				"invoice/retryToCollect",
				body,
				"POST"
			)

			return resp
		} catch (err) {
			console.log(err)

			return null
		}
	}
}

module.exports = InvoiceHTTPService
