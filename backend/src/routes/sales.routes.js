const router = require("express").Router();

const {
  newSale,
  getSales,
  deleteSaleById,
  updateSaleById,
  getSalesForUserId,
  getSalesForDate,
  getSalesOrderDate,
  getAmountForUser,
  getAmountForUserAndDate,
  getProductUserAmountByDate,
} = require("../controllers/sales.controller");
const verifyToken = require("../middlewares/authjwt");


//Rutas de los productos
router.get("/sales",verifyToken, getAmountForUser);
router.get("/salesAmountAndDate",verifyToken, getAmountForUserAndDate);

router.get("/allSales",verifyToken, getSales);

router.post("/newSale",verifyToken, newSale);

router.get("/salesForDate", verifyToken, getSalesForDate)

router.get("/salesOrderDate",verifyToken, getSalesOrderDate)

//router.put("/updateSale/:saleId",verifyToken, updateSaleById);

//router.delete("/deleteSale/:saleId",verifyToken, deleteSaleById)


module.exports = router;
