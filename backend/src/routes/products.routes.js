const router = require("express").Router();

const verifyToken = require('../middlewares/authjwt')
const isAdmin = require('../middlewares/isAdmin')







const {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductByFilter,
} = require("../controllers/products.controller");


//Rutas de los productos
router.get("/Products", getProducts);

router.get("/ProductsF/:filter", getProductByFilter);

router.get("/getProduct/:id",verifyToken,isAdmin, getProductById);


router.post("/Products",verifyToken,isAdmin, createProduct);


router.put("/updateProduct/:productId",verifyToken,isAdmin, updateProductById);

router.delete("/deleteProduct/:productId",verifyToken,isAdmin, deleteProductById);


module.exports = router;
