/**
 * Customer handlers
 */
const {Router} = require("express")
const container = require("../../../infrastructure/di")
const customerService = container.resolve("customerService")
const invoiceService = container.resolve("invoiceService")
const {
	InvalidCustomerRutException,
	DoesNotExistCustomerException,
	TheCustomerDontHaveASubscriptionException,
	InvoiceDoesNotPossibleChangerMailIsSendException,
	InvoiceDoesNotExistException,
	TheRutExistException
} = require("../../../infrastructure/error")

const router = Router()

router.post("/", function (req, res) {
	console.log("Call function create customers")

	customerService
		.add(req.body)
		.then((data) => {
			res.status(201).json(data)
		})
		.catch((error) => {
			console.log(error)
			switch (error.constructor) {
				case TheRutExistException:
				case InvalidCustomerRutException:
					res.status(400)
					break
				default:
					res.status(500)
					break
			}
			res.json({
				type: error.type,
				message: error.message
			})
		})
})

router.post("/:id", function (req, res) {
	console.log("Call function for update customer data")

	customerService
		.update(req.params.id, req.body)
		.then(() => {
			res.status(204).json()
		})
		.catch((error) => {
			console.log(error)
			switch (error.constructor) {
				case TheRutExistException:
				case InvalidCustomerRutException:
					res.status(400)
					break
				default:
					res.status(500)
					break
			}
			res.json({
				type: error.type,
				message: error.message
			})
		})
})

router.get("/", function (req, res) {
	console.log("Call function get all customers")

	customerService
		.getAll(req.query.filter, req.query.page, req.query.status)
		.then((data) => {
			res.status(200).json(data)
		})
		.catch((error) => {
			res.json({
				type: error.type,
				message: error.message
			})
		})
})

router.get("/:id", function (req, res) {
	console.log("Call function get customers details")
	customerService
		.get({
			id: req.params.id
		})
		.then((data) => {
			res.status(200).json(data)
		})
		.catch((error) => {
			res.json({
				type: error.type,
				message: error.message
			})
		})
})

router.get("/:id/invoices", function (req, res) {
	console.log("Call function get invoices by customers id")
	invoiceService
		.getAllByCustomerId(req.params.id, req.query.page)
		.then((data) => {
			res.status(200).json(data)
		})
		.catch((error) => {
			switch (error.constructor) {
				case DoesNotExistCustomerException:
				case TheCustomerDontHaveASubscriptionException:
					res.status(400)
					break
				default:
					res.status(500)
					break
			}
			res.json({
				type: error.type,
				message: error.message
			})
		})
})

router.post("/:id/invoices/retryPaymentIntent", function (req, res) {
	console.log("Call function get invoices by customers id")
	invoiceService
		.retryPaymentIntent(req.body.invoiceId, req.params.id)
		.then((data) => {
			res.status(200).json(data)
		})
		.catch((error) => {
			switch (error.constructor) {
				case InvoiceDoesNotExistException:
				case InvoiceDoesNotPossibleChangerMailIsSendException:
				case DoesNotExistCustomerException:
					res.status(400)
					break
				default:
					res.status(500)
					break
			}
			res.json({
				type: error.type,
				message: error.message
			})
		})
})

router.get("/:id/getAllPaymentIntent", function (req, res) {
	console.log("Call function payment intent")
	customerService
		.getAllPaymentIntent(req.params.id, req.query.page)
		.then((data) => {
			res.status(200).json(data)
		})
		.catch((error) => {
			switch (error.constructor) {
				case DoesNotExistCustomerException:
					res.status(400)
					break
				default:
					res.status(500)
					break
			}
			res.json({
				type: error.type,
				message: error.message
			})
		})
})

router.get("/:id/getAllChargeFailed", function (req, res) {
	console.log("Call function charge intent failed")
	customerService
		.getAllPaymentIntentFailed(req.params.id, req.query.page)
		.then((data) => {
			res.status(200).json(data)
		})
		.catch((error) => {
			switch (error.constructor) {
				case DoesNotExistCustomerException:
					res.status(400)
					break
				default:
					res.status(500)
					break
			}
			res.json({
				type: error.type,
				message: error.message
			})
		})
})

module.exports = router
