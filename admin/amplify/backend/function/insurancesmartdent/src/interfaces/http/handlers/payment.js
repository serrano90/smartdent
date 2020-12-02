/**
 * Payment handlers
 */
const {Router} = require("express")
const container = require("../../../infrastructure/di")
const {
	DoesNotExistCustomerException,
	DoesNotPossibleSendEmailException,
} = require("../../../infrastructure/error")
const paymentService = container.resolve("paymentService")
const config = container.resolve("config")

const router = Router()

/**
 * Register Card
 */
router.post("/registerCard", function (req, res) {
	console.log("Call function register card payment")

	paymentService
		.addCard(req.body)
		.then((data) => {
			res.status(201).json(data)
		})
		.catch((error) => {
			console.log(error)
			switch(error.constructor) {
				default:
					res.status(500)
					break
			}
			
			res.json({
				type: error.type,
				message: error.message,
			})
		})
})

/** 
 * Delete Register Card Redirect
*/
router.post("/unRegisterCard", function (req, res) {
	console.log("Call function for delete card")

	paymentService
		.removeCard(req.body.id)
		.then(() => {
			res.status(204).json()
		})
		.catch((error) => {
			console.log(error)
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

/** 
 * Register Card Redirect
*/
router.post("/registerCardComplete", function (req, res) {
	console.log("Call function register card payment complete")

	res.redirect(config.flowCL.baseURL)
})

/**
 * Update Card
 */
router.post("/sendEmailToRegisterCard", function (req, res) {
	console.log("Call function to send customer for register the new card")
	paymentService
		.updateCardByEmail(req.body.id)
		.then((data) => {
			res.status(201).json(data)
		})
		.catch((error) => {
			switch (error.constructor) {
				case DoesNotExistCustomerException:
				case DoesNotPossibleSendEmailException:
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

/**
 * Update new Payment Card
 */
router.post("/updateCardComplete", function (req, res) {
	console.log("Call function register card payment complete")
	
	paymentService
		.getUpdateStatusCardRegister(req.query.id)
		.then((data) => {
			res.redirect(`${config.flowCL.baseUpdateCardURL}?status=${data.card.status}`)
		})
		.catch((error) => {
			res.status(500)
			res.json({
				message: error.message
			})
		})

})

/**
 * Register Card Complete with client Id
 */
router.post("/registerCardAdminComplete/:id", function (req, res) {
	console.log("Call function register card payment complete")

	paymentService
		.getUpdateStatusCardRegister(req.params.id)
		.then((data) => {
			if (data.card.status) {
				res.redirect(`${config.flowCL.baseAdminURL}/${data.id}`)
			} else {
				res
					.status(400)
					.json({message: "La tarjeta no ha sido registrada correctamente"})
			}
		})
		.catch((error) => {
			res.status(500)
			res.json({
				message: error.message
			})
		})
})

/**
 * Register Card Status
 */
router.get("/getRegisterCardStatus", function (req, res) {
	console.log("Call function register card payment status")
	paymentService
		.getStatusCardRegister(req.query.token)
		.then((data) => {
			if (data.status) {
				res.status(201).json(data)
			} else {
				res
					.status(400)
					.json({message: "La tarjeta no ha sido registrada correctamente"})
			}
		})
		.catch((error) => {
			res.status(500)
			res.json({
				message: error.message
			})
		})
})

module.exports = router
