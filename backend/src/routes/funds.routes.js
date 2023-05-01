const router = require('express').Router()

const {newFund, getFunds, getFundsForUserId} = require("../controllers/funds.controllers")
const verifyToken = require('../middlewares/authjwt')

router.post("/sendFund",verifyToken, newFund)
router.get("/getTotalFund",verifyToken, getFunds)
router.get("/getFundUser",verifyToken, getFundsForUserId)

module.exports = router