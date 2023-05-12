const router = require('express').Router()

const {createCategory, getCategories, deleteCategoryById, updateCategoryById, getCategoryForId} = require('../controllers/categories.controllers')
const verifyToken = require('../middlewares/authjwt')

router.get('/Categories',verifyToken, getCategories)

router.get('/getCategoryForId/:categoryId',verifyToken, getCategoryForId)

router.post('/Categories',verifyToken, createCategory)

router.delete('/delCategory/:categoryId',verifyToken, deleteCategoryById )

router.put('/updateCategory/:categoryId',verifyToken, updateCategoryById)

module.exports = router