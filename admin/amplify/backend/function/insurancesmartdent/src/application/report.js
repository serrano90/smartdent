/**
 * Report Service
 */

class ReportService {
	constructor({customerHttpService, customerRepository}) {
		this.customerHttpService = customerHttpService
		this.customerRepository = customerRepository
	}

	async countResume() {
		const customers = await this.customerHttpService.getAll("", 1, true)
		const customerMorose = await this.customerRepository.getAllCustomerWithMoroseSubscription()
		const customerPaySuccess = await this.customerRepository.getAllCustomerWithStatusSubscription()

		return {
			totalCustomers: customers.totalRecords,
			totalCustomersWithSuccessPay: customerPaySuccess,
			totalCustomerWithMorosePay: customerMorose
		}
	}
}

module.exports = ReportService
