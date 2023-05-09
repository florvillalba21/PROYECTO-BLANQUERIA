const router = require('express').Router()

const {newFund, getFunds, getFundsForUserId, getFundsForDate, getFundsOrderDate} = require("../controllers/funds.controllers")
const verifyToken = require('../middlewares/authjwt')

router.post("/sendFund",verifyToken, newFund)
router.get("/getTotalFund",verifyToken, getFunds)
router.get("/getFundUser",verifyToken, getFundsForUserId)
router.get("/getFundDate",verifyToken, getFundsForDate)

router.get("/getFundOrderDate",verifyToken, getFundsOrderDate)

module.exports = router