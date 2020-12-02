/**
 * InvoiceService
 */
import HTTPClient from "packages/http/http"
import resources from "./resources"

export default class InvoiceService {
    /**
	 * Plans Service
	 */
	constructor() {
		if (!InvoiceService.instance) {
			this.client = new HTTPClient()
			InvoiceService.instance = this
		}
		return InvoiceService.instance
    }
    
    /**
	 * Create Customer
	 */
    getCustomerInvoice = (id, currentPage) => {
		return this.client.get(resources.INVOICES.CUSTOMER_INVOICE.PATH+"/"+id+"/invoices", {
			params: {
				page: currentPage,
			}
		})
	}

	/**
	 * Create Customer
	 */
    retryPaymentIntent = (id, invoiceId) => {
		return this.client.post(resources.INVOICES.CUSTOMER_INVOICE.PATH+"/"+id+"/invoices/retryPaymentIntent", {
			invoiceId: invoiceId
		})
	}
}