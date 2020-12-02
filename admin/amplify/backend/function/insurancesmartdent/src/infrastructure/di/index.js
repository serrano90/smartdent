/**
 * Dependecy Injection Container
 */
const awilix = require('awilix')
const config = require("../config")
const flowCL = require("../flowcl")
const db = require("../aws/dynamodb")
const ses = require("../aws/ses")
const mailService = require("../mail")
const planHttpService = require("../services/plan")
const customerHttpService = require("../services/customer")
const paymentHttpService = require("../services/payment")
const subscriptionHttpService = require("../services/subscription")
const invoiceHttpService = require("../services/invoices") 
const customerRepository = require("../repository/customer")
const paymentRepository = require("../repository/payment")
const planService = require("../../application/plan")
const customerService = require("../../application/customer")
const paymentService = require("../../application/payment")
const subscriptionService = require("../../application/subscription")
const invoiceService = require("../../application/invoice")
const reportService = require("../../application/report")
const siiClientService = require("../sii")

const container = awilix.createContainer()

container.register({
    config: awilix.asValue(config),
    flowCL: awilix.asValue(flowCL),
    db: awilix.asFunction(db).singleton(),
    mailProvider: awilix.asFunction(ses).singleton(),
    mailService: awilix.asClass(mailService).singleton(),
    planHttpService: awilix.asClass(planHttpService).singleton(),
    customerHttpService: awilix.asClass(customerHttpService).singleton(),
    paymentHttpService: awilix.asClass(paymentHttpService).singleton(),
    subscriptionHttpService: awilix.asClass(subscriptionHttpService).singleton(),
    invoiceHttpService: awilix.asClass(invoiceHttpService).singleton(),
    customerRepository: awilix.asClass(customerRepository).singleton(),
    paymentRepository: awilix.asClass(paymentRepository).singleton(),
    planService: awilix.asClass(planService).singleton(),
    customerService: awilix.asClass(customerService).singleton(),
    paymentService: awilix.asClass(paymentService).singleton(),
    subscriptionService: awilix.asClass(subscriptionService).singleton(),
    invoiceService: awilix.asClass(invoiceService).singleton(),
    reportService: awilix.asClass(reportService).singleton(),
    siiClientService: awilix.asClass(siiClientService).singleton()
})

module.exports = container