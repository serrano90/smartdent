/**
 * Customers
 */
const uuid = require("uuid")
const {Customer} = require("../domain/entity")
const {
	InvalidCustomerRutException,
	TheRutExistException,
	DoesNotExistCustomerException
} = require("../infrastructure/error")

class CustomerService {
	constructor({
		customerHttpService,
		paymentHttpService,
		customerRepository,
		siiClientService,
	}) {
		this.customerHttpService = customerHttpService
		this.customerRepository = customerRepository
		this.siiClientService = siiClientService
		this.paymentHttpService = paymentHttpService
	}

	async add(input) {
		// Create a new instance of Customer
		input.id = uuid.v4()
		input.subscription = null
		input.card = null
		let customer = Customer(input)

		// Check if RUT exist in national BBDD
		const isValidRut = await this.siiClientService.validateRut(
			customer.rut,
			customer.getFullName()
		)
		if (!isValidRut) {
			throw new InvalidCustomerRutException(
				"El RUT no existe o no coincide con los datos proporcionados"
			)
		}

		// Check if customer does not have a register in our BBDD
		const isValidCustomer = await this.customerRepository.readByRut(
			customer.rut
		)
		if (isValidCustomer !== null) {
			throw new TheRutExistException("El RUT proporcionado ya esta registrado ")
		}

		// Register the new customer in FlowCL
		const flowCLData = await this.customerHttpService.create(customer)

		// Update customer data
		customer = Customer.update(customer, {
			flowCustomerId: {$set: flowCLData.customerId},
			status: {$set: flowCLData.status === 1}
		})

		// Register the new customer in our BBDD
		await this.customerRepository.create(customer)
		return customer
	}

	async update(id, input) {
		// Get Customer Details
		let customer = await this.customerRepository.readById(id)

		if (customer === null) {
			throw new DoesNotExistCustomerException(
				"No existe ningun clientes con el siguiente Id"
			)
		}

		// Check if RUT exist in national BBDD
		const isValidRut = await this.siiClientService.validateRut(
			input.rut,
			`${input.name} ${input.lastName}`
		)
		if (!isValidRut) {
			throw new InvalidCustomerRutException(
				"El RUT no existe o no coincide con los datos proporcionados"
			)
		}

		if (input.rut !== customer.rut) {
			// Check if customer does not have a register in our BBDD
			const isValidCustomer = await this.customerRepository.readByRut(
				customer.rut
			)
			if (isValidCustomer !== null) {
				throw new TheRutExistException(
					"El RUT proporcionado ya esta registrado "
				)
			}
		}

		// Update customer data
		customer = Customer.update(customer, {
			rut: {$set: input.rut},
			name: {$set: input.name},
			lastName: {$set: input.lastName},
			email: {$set: input.email}
		})

		//Update data in FlowCL
		await this.customerHttpService.update(customer)

		//Database update
		await this.customerRepository.update(customer)

		return null
	}

	async getAll(filter, page, status) {
		// Get All
		const resp = await this.customerHttpService.getAll(filter, page, status)
		return resp
	}

	async get(input) {
		// Get Customer Details
		const resp = await this.customerRepository.readById(input.id)
		return resp
	}

	/**
	 * Get payment intent by customer Id
	 *
	 * @param {string} id
	 * @param {number} page
	 */
	async getAllPaymentIntent(id, page = 1) {
		// Get Customer
		let customer = await this.customerRepository.readById(id)

		if (customer === null) {
			throw new DoesNotExistCustomerException(
				"No existe ningun clientes con el siguiente Id"
			)
		}

		const resp = await this.paymentHttpService.getAllPaymentIntentByCustomer(
			customer.flowCustomerId,
			page
		)

		return resp
	}

	/**
	 * Get payment failed intent by customer Id
	 *
	 * @param {string} id
	 * @param {number} page
	 */
	async getAllPaymentIntentFailed(id, page = 1) {
		// Get Customer
		let customer = await this.customerRepository.readById(id)

		if (customer === null) {
			throw new DoesNotExistCustomerException(
				"No existe ningun clientes con el siguiente Id"
			)
		}

		const resp = await this.paymentHttpService.getAllPaymentIntentFailByCustomer(
			customer.flowCustomerId,
			page
		)

		return resp
	}
}

module.exports = CustomerService
