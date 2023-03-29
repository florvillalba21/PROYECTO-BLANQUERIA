const router = require("express").Router();



// //Llamando a la dependencia multer
// const multer = require('multer')
// const path = require('path')

// //Configuracion del multer, diciendole donde se guardara 
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '../uploads'))
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().getTime() + path.extname(file.originalname))
//   }
// })

// const upload = multer({ storage: storage })

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

router.get("/Products/:productId", getProductById);


router.post("/Products",verifyToken,isAdmin, createProduct);


router.put("/Products/:productId",verifyToken,isAdmin, updateProductById);

router.delete("/Products/:productId",verifyToken,isAdmin, deleteProductById);


module.exports = router;
