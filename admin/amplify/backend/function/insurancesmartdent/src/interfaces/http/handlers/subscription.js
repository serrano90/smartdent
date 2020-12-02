/**
 * Subcriptions handlers
 */
const {Router} = require('express');
const container = require("../../../infrastructure/di")
const subscriptionService = container.resolve("subscriptionService")
const {
    DoesNotExistCustomerException,
    TheCustomerHaveASubscriptionException,
    TheCustomerDontHaveASubscriptionException
} = require("../../../infrastructure/error")

const router = Router()

/**
 * Register
 */
router.post('/', function(req, res){
   console.log("Call function create subscriptions")

   subscriptionService.create(req.body)
    .then((data) => {
        if (data.status === 1) {
            res.status(201).json(data)
        }else {
            res.status(404).json({
                message: "Not Found"
            })
        }
        
    })
    .catch(error => {
        switch (error.constructor) {
            case TheCustomerHaveASubscriptionException:
                res.status(404)
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
});

/**
 * Register
 */
router.post('/update', function(req, res){
    console.log("Call function create subscriptions")
 
    subscriptionService.update(req.body.customerId)
     .then((data) => {
        res.status(200).json(data)
     })
     .catch(error => {
         switch (error.constructor) {
             case TheCustomerHaveASubscriptionException:
                 res.status(404)
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
 });
 

/**
 * UnRegister
 */
router.post("/unSubscriber", function(req, res){
    console.log("Call function delete subscriptions")

    subscriptionService.delete(req.body)
    .then((data) => {
        if (data.status === 1) {
            res.status(200).json(data)
        }else {
            res.status(404).json({
                message: "Not Found"
            })
        }
    })
    .catch((error) => {
        console.log(error)
        switch (error.constructor) {
            case DoesNotExistCustomerException:
                res.status(400)
                break
            case TheCustomerDontHaveASubscriptionException:
                res.status(404)
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