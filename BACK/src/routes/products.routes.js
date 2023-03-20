const router = require("express").Router();
//Desestructuracion de los controladores
const {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/products.controller");

//Rutas de los productos
router.get("/Products", getProducts);

router.get("/Products/:productId", getProductById);

router.post("/Products", createProduct);

router.put("/Products/:productId", updateProductById);

router.delete("/Products/:productId", deleteProductById);

module.exports = router;
