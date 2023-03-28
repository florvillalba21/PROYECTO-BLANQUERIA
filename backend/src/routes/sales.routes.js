const router = require("express").Router();

const {
  newSale,
  getSales,
  deleteSaleById,
  updateSaleById,
} = require("../controllers/sales.controller");


//Rutas de los productos
router.get("/sales", getSales);

router.post("/newSale/:userId", newSale);

router.put("/updateSale/:saleId", updateSaleById);

router.delete("/deleteSale/:saleId", deleteSaleById)


module.exports = router;
