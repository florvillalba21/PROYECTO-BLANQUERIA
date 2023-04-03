const router = require('express').Router()

const {createCategory, getCategories} = require('../controllers/categories.controllers')

router.get('/Categories', getCategories)

router.post('/Categories', createCategory)

module.exports = router