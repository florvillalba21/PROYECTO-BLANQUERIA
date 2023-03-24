const router = require("express").Router();


//Llamando a la dependencia multer
const multer = require('multer')
const path = require('path')

//Configuracion del multer, diciendole donde se guardara 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })


const {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/products.controller");


//Rutas de los productos
router.get("/", getProducts);

router.get("/Products/:productId", getProductById);


router.post("/Products",upload.single('image'), createProduct);


router.put("/Products/:productId", updateProductById);

router.delete("/Products/:productId", deleteProductById);


module.exports = router;
