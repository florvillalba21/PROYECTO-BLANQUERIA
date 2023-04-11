const router = require('express').Router()

const {createCategory, getCategories} = require('../controllers/categories.controllers')

router.get('/Categories', getCategories)

router.post('/Categories', createCategory)

router.delete('/Categories:categoryId', createCategory)

router.put('/Categories:categoryId', createCategory)

module.exports = router