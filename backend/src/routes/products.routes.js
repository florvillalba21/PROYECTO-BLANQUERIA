const router = require("express").Router();

const verifyToken = require('../middlewares/authjwt')
const isAdmin = require('../middlewares/isAdmin')







const {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/products.controller");


//Rutas de los productos
router.get("/Products", getProducts);

router.get("/ProductsF/:filter", getProductById);


router.post("/Products",verifyToken,isAdmin, createProduct);


router.put("/Products/:productId",verifyToken,isAdmin, updateProductById);

router.delete("/Products/:productId",verifyToken,isAdmin, deleteProductById);


module.exports = router;
