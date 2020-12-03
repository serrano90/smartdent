/**
 * InvoiceService
 */
import HTTPClient from "packages/http/http"
import resources from "./resources"

export default class ReportService {
    /**
	 * Plans Service
	 */
	constructor() {
		if (!ReportService.instance) {
			this.client = new HTTPClient()
			ReportService.instance = this
		}
		return ReportService.instance
    }
    
    /**
	 * Create Customer
	 */
    getTotalReport = () => {
		return this.client.get(resources.REPORTS.GET_TOTAL_REPORT.PATH,{})
	}
}