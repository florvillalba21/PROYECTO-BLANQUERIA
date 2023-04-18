const router = require("express").Router();

const {
  newSale,
  getSales,
  deleteSaleById,
  updateSaleById,
  getSalesForUserId,
} = require("../controllers/sales.controller");
const verifyToken = require("../middlewares/authjwt");


//Rutas de los productos
router.get("/sales",verifyToken, getSalesForUserId);
router.get("/allSales", getSales);

router.post("/newSale",verifyToken, newSale);

//router.put("/updateSale/:saleId",verifyToken, updateSaleById);

//router.delete("/deleteSale/:saleId",verifyToken, deleteSaleById)


module.exports = router;
