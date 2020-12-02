/**
 * Report handlers
 */
const {Router} = require('express');
const container = require("../../../infrastructure/di")
const reportService = container.resolve("reportService")

const router = Router()

router.get('/totalReport', function(req, res){
   console.log("Call function get plans")

   reportService.countResume()
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