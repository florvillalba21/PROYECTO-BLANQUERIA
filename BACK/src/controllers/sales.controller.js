const Sale = require("../models/Sales");

//se inicializa un objeto vacio para luego agregar sus metodos
ctrlSales = {};


//metodo para agregar una nueva venta
ctrlSales.newSale = async (req, res) => {
  const {serialNumber, products, details, date, totalAmount } = req.body;

  const newSale = new Sale({ serialNumber, products, details, date, totalAmount });

  const saleSaved = await newSale.save();

  res.status(201).json(saleSaved);
};

// //Funcion para obtener la lista de todos los productos guardados
// ctrlSales.getSales = async (req, res) => {
//   const products = await Product.find();

//   res.status(200).json(products);
// };

// //Funcion para obtener un producto en base al id
// ctrlSales.getSaleDate = async (req, res) => {
// //   try {
// //     const product = await Product.findById(req.params.productId);

// //     res.status(200).json(product);
// //   } catch (error) {
// //     console.log(error);
// //   }
// };



//EN PROCESO
module.exports = ctrlSales;
