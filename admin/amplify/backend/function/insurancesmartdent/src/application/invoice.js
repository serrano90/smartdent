/**
 * InvoiceService
 */
const uuid = require("uuid")
const {Customer} = require("../domain/entity")
const {transformPaginations} = require("../infrastructure/utils/paginations")
const {
	TheCustomerDontHaveASubscriptionException,
	InvoiceDoesNotPossibleChangerMailIsSendException,
	InvoiceDoesNotExistException,
	DoesNotExistCustomerException
} = require("../infrastructure/error")

class InvoiceService {
	constructor({
		subscriptionHttpService,
		customerRepository,
		invoiceHttpService,
		subscriptionService,
	}) {
		this.subscriptionHttpService = subscriptionHttpService
		this.customerRepository = customerRepository
		this.invoiceHttpService = invoiceHttpService
		this.subscriptionService = subscriptionService
	}

	async getAllByCustomerId(id, page = 1) {
		// Get Customer Details
		let customer = await this.customerRepository.readById(id)

		if (customer === null) {
			throw new DoesNotExistCustomerException(
				"No existe ningun clientes con el siguiente Id"
			)
		}

		if (customer.subscription === null) {
			throw new TheCustomerDontHaveASubscriptionException(
				"El cliente no tienen ninguna subcripcion creada"
			)
		}

		const subscriptions = await this.subscriptionHttpService.readById(
			customer.subscription.id
		)

		return {
			data: subscriptions.invoices.slice((page - 1) * 10, page * 10),
			...transformPaginations(subscriptions.invoices.length, page)
		}
	}

	/**
	 * Retry Payment Intent
	 * 
	 * @param {*} invoiceId 
	 * @param {*} customerId 
	 */
	async retryPaymentIntent(invoiceId, customerId) {
		let resp = await this.invoiceHttpService.retryPaymentIntent(invoiceId)

		if (resp === null) {
			throw new InvoiceDoesNotExistException(
				"No existe un Invoice con el el identificador definido"
			)
		}

		console.log(customerId)

		switch (resp.status) {
			case 1:
				throw new InvoiceDoesNotPossibleChangerMailIsSendException(
					"El cargo esta pendiente, se le ha enviado un correo electrónico"
				)
			case 2:
				await this.subscriptionService.update(customerId, true)
				break
			case 3:
				throw new InvoiceDoesNotPossibleChangerMailIsSendException(
					"El cargo esta pendiente, se le ha enviado un correo electrónico"
				)
			default:
				throw new InvoiceDoesNotPossibleChangerMailIsSendException(
					"El cargo esta pendiente, se le ha enviado un correo electrónico"
				)
		}

		return null
	}
}

module.exports = InvoiceService
