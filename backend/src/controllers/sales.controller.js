const Sale = require("../models/Sales");

const User = require("../models/User");
//se inicializa un objeto vacio para luego agregar sus metodos
ctrlSales = {};

//metodo para agregar una nueva venta
ctrlSales.newSale = async (req, res) => {
  const { products, details, date, totalAmount, userVenta } = req.body;

  const serial = await Sale.find();

  const serialNumber = serial.length.toString();

  const newSale = new Sale({
    serialNumber,
    products,
    details,
    date,
    totalAmount,
    userVenta,
    
  });

  const foundUser = await User.findById(req.params.userId);
  newSale.userVenta = foundUser._id

  const saleSaved = await newSale.save();

  res.status(201).json(saleSaved);
};

// //Funcion para obtener la lista de todos los productos guardados
ctrlSales.getSales = async (req, res) => {
  try {
    // const serial = await Sale.find().limit(1).sort({ $natural: -1 });

    const sales = await Sale.find();

    res.status(200).json(sales)
  } catch (error) {
    console.log(error);
  }
};

//Funcion para actualizar un producto en base al id
ctrlSales.updateSaleById = async (req, res) => {
  /*FindUpdate recibe el id, lo que se va a reemplazar del producto en este caso req.body 
  y new:true para que devuelva el producto nuevo y no el que se borra*/
  const updatedSale = await Sale.findByIdAndUpdate(
    req.params.saleId,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedSale);
};

//Funcion para borrar un elemento en base al id
ctrlSales.deleteSaleById = async (req, res) => {
  const deleteSale = await Sale.findByIdAndDelete(req.params.saleId);
  res.status(200).json(deleteSale);
  const serial = await Sale.find();

  const serialNumber = serial.length.toString();
};

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
