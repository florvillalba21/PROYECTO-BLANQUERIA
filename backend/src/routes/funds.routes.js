const router = require('express').Router()

const {newFund, getFunds, getFundsForUserId} = require("../controllers/funds.controllers")
const verifyToken = require('../middlewares/authjwt')

router.post("/sendFund",verifyToken, newFund)
router.post("/Fund",verifyToken, getFunds)
router.post("/Fund",verifyToken, getFundsForUserId)

module.exports = router