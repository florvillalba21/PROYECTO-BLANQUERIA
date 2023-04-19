const Sale = require("../models/Sale");

//se inicializa un objeto vacio para luego agregar sus metodos
ctrlSales = {};

//metodo para agregar una nueva venta
ctrlSales.newSale = async (req, res) => {
  const { products, details, date, paymentMethod, totalAmount } = req.body;

  const userVenta = req.user._id;

  const serial = await Sale.find();

  const serialNumber = serial.length.toString();

  const newSale = new Sale({
    serialNumber,
    products,
    details,
    date,
    paymentMethod,
    totalAmount,
    userVenta,
  });

  try {
    const saleSaved = await newSale.save();

    res.status(201).json(saleSaved);
  } catch (error) {
    console.log(error);
  }
};

ctrlSales.getSalesForUserId = async (req, res) => {
  const userVenta = req.user._id; //toma el id del usuario ingresado

  const filterSales = await Sale.find({ userVenta });

  return res.json({
    message: `Ventas del usuario ${req.user.username}`,
    filterSales,
  });
};

// //Funcion para obtener la lista de todos los productos guardados
ctrlSales.getSales = async (req, res) => {
  // const serial = await Sale.find().limit(1).sort({ $natural: -1 });

  const sales = await Sale.find();

  Sale.aggregate([
    {
      $group: {
        _id: null,
        salesTotalAmount: { $sum: "$totalAmount" },
      },
    },
  ])
    .then((result) => {
      const salesTotalAmount = result[0].salesTotalAmount;
      console.log(sales)
      res.json({
        allSales: sales,
        salesAmount: salesTotalAmount,
      });
    })
    .catch((err) => {
      res.json({
        err,
      });
    });
};

module.exports = ctrlSales;
