const router = require('express').Router()

const {createCategory} = require('../controllers/categories.controllers')

router.post('/Categories', createCategory)

module.exports = router