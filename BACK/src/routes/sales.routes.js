const router = require("express").Router();

const {
  newSale,
  getSales,
} = require("../controllers/products.controller");


//Rutas de los productos
router.get("/sales", getSales);

router.post("/newSale", newSale);

// router.delete("/cancelSale/:", deleteProductById);


module.exports = router;
