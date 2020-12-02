const {Router} = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const compression = require("compression")
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware")
const container = require("../../infrastructure/di")
const config = container.resolve("config")

const health = require("./handlers/health")
const plans = require("./handlers/plans")
const customers = require("./handlers/customer")
const payments = require("./handlers/payment")
const subcriptions = require("./handlers/subscription")
const report = require("./handlers/reports")

const router = Router()
router.use(
	cors({
		origin: [config.cors.url],
		methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Cache-Control"]
	})
)
router.use(bodyParser.json())
router.use(compression())
router.use(awsServerlessExpressMiddleware.eventContext())

const v1 = Router()

v1.use("/health", health)
v1.use("/plans", plans)
v1.use("/customers", customers)
v1.use("/payments", payments)
v1.use("/subscriptions", subcriptions)
v1.use("/reports", report)

router.use("/v1", v1)

module.exports = router
