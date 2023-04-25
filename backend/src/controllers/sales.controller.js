const Sale = require("../models/Sale");
const Product = require("../models/Product")

//se inicializa un objeto vacio para luego agregar sus metodos
ctrlSales = {};

//metodo para agregar una nueva venta
ctrlSales.newSale = async (req, res) => {
  const { products, details, date, paymentMethod, totalAmount } = req.body;

  const updateQuantity = async (productId, quant) => {
    try {
      const product = await Product.findById(productId); // Busca el producto por su ID
      product.stock= product.stock - quant; // Actualiza la cantidad del producto
      await product.save(); // Guarda el producto actualizado en la base de datos
      console.log(
        `La cantidad de ${product.name} se actualizó a ${product.quantity}.`
      );
    } catch (error) {
      console.error(error);
    }
  };

  for (let i = 0; i < products.length; i++) {
    let prodId = products[i]._id;
    let quant = products[i].quantity;
    await updateQuantity(prodId, quant)
  }

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

ctrlSales.getSalesForDate = async (req, res) => {
  const { month, year } = req.query

  const regex = new RegExp(`\\b${month}\\b.*\\b${year}\\b`, "i");

  // Hacer la consulta con Mongoose

 // Hacer la consulta con Mongoose
Sale.find({ date: { $regex: regex } })

  .then((resultados) => {
    if(resultados.length > 0){
      const totalAmount = resultados.reduce((total, sale) => total + sale.totalAmount, 0)

      res.json({
        ok: true,
        filterSales:resultados,
        amount:totalAmount
      })
    }
    else{
      res.json({
        ok: false,
        msg: "No hay archivos con esa fecha"})
    }
    
  })
  .catch((error) => {
    console.log(error);
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
      console.log(sales);
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
