/**
 * Plans handlers
 */
const {Router} = require('express');
const container = require("../../../infrastructure/di")
const planService = container.resolve("planService")

const router = Router()

router.get('/', function(req, res){
   console.log("Call function get plans")

   planService.all()
    .then((data) => {
        res.json(data)
    })
    .catch(error => {
        console.log(error.message)
        res.status(500)
        res.json({
            message: error.message,
        })
    })
});


module.exports = router