const router = require('express').Router()

const {newFund, getFunds, getFundsForUserId, getFundsForDate} = require("../controllers/funds.controllers")
const verifyToken = require('../middlewares/authjwt')

router.post("/sendFund",verifyToken, newFund)
router.get("/getTotalFund",verifyToken, getFunds)
router.get("/getFundUser",verifyToken, getFundsForUserId)
router.get("/getFundDate",verifyToken, getFundsForDate)

module.exports = router