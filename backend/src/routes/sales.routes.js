const router = require("express").Router();

const {
  newSale,
  getSales,
  deleteSaleById,
  updateSaleById,
  getSalesForUserId,
  getSalesForDate,
  getSalesOrderDate,
} = require("../controllers/sales.controller");
const verifyToken = require("../middlewares/authjwt");


//Rutas de los productos
router.get("/sales",verifyToken, getSalesForUserId);

router.get("/allSales",verifyToken, getSales);

router.post("/newSale",verifyToken, newSale);

router.get("/salesForDate",  getSalesForDate)

router.get("/salesOrderDate", getSalesOrderDate)

//router.put("/updateSale/:saleId",verifyToken, updateSaleById);

//router.delete("/deleteSale/:saleId",verifyToken, deleteSaleById)


module.exports = router;
