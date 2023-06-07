const Sale = require("../models/Sale");
const Product = require("../models/Product");

//se inicializa un objeto vacio para luego agregar sus metodos
ctrlSales = {};

//metodo para agregar una nueva venta
ctrlSales.newSale = async (req, res) => {
  const { products, date, paymentMethod, totalAmount } = req.body;

  if (products.length > 0) {
    const updateQuantity = async (productId, quant) => {
      try {
        const product = await Product.findById(productId); // Busca el producto por su ID
        product.stock = product.stock - quant; // Actualiza la cantidad del producto
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
      await updateQuantity(prodId, quant);
    }

    const userVenta = req.user._id;

    const serial = await Sale.find();

    const serialNumber = serial.length.toString();

    const newSale = new Sale({
      serialNumber,
      products,
      date,
      paymentMethod,
      totalAmount,
      userVenta,
    });

    try {
      const saleSaved = await newSale.save();

      res.status(201).json({
        ok: true,
        saleSaved,
      });
    } catch (error) {
      console.log(error);
      res.json({ ok: false });
    }
  } else {
    return res.json({ ok: false });
  }
};

ctrlSales.getSalesOrderDate = async (req, res) => {
  try {
    Sale.aggregate([
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          total: { $sum: "$totalAmount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]).then((result) => {
      if (result.length > 0) {
        res.json({
          ok: true,
          result: result,
        });
      } else {
        res.json({
          ok: false,
          msg: "No existen ventas registradas",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
ctrlSales.getAmountForUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const ventas = await Sale.find().lean(); // Obtenemos las ventas del usuario

    const sumaTotal = ventas.reduce((total, venta) => {
      const productosUsuario = venta.products.filter(
        (producto) => producto.productOwner.toString() === userId.toString()
      );
      const sumaVenta = productosUsuario.reduce(
        (suma, producto) => suma + producto.sellPrice,
        0
      );
      return total + sumaVenta;
    }, 0);

    console.log(sumaTotal);
    res.json({
      ok: true,
      msg: `Suma de productos del usuario ${req.user.username}`,
      productsUserAmount: sumaTotal,
    });
  } catch (error) {
    res.json({
      ok: false,
      msg: error,
    });
  }
};

// ctrlSales.getAmountForUserAndDate = async (req, res) => {
//   try {
//     const userId = req.user._id.toString();
//     const { month, year } = req.query;

//     const regex = new RegExp(`\\b${month}\\b.*\\b${year}\\b`, "i");
//     const startDate = new Date(year, month - 1, 1);
//     const endDate = new Date(year, month, 0);

//     Sale.aggregate([
//       {
//         $match: {
//           "products.productOwner": userId,
//           date: {
//             $gte: startDate,
//             $lte: endDate,
//           },
//         },
//       },
//       {
//         $unwind: "$products",
//       },
//       {
//         $lookup: {
//           from: "products",
//           localField: "products._id",
//           foreignField: "_id",
//           as: "productDetails",
//         },
//       },
//       {
//         $unwind: "$productDetails",
//       },
//       {
//         $match: {
//           "productDetails.productOwner": userId,
//         },
//       },
//       {
//         $group: {
//           _id: {
//             year: { $year: "$date" },
//             month: { $month: "$date" },
//             product: "$products.name",
//           },
//           totalSellPrice: { $sum: { $multiply: ["$products.sellPrice", "$products.quantity"] } },
//           totalCostPrice: { $sum: { $multiply: ["$products.costPrice", "$products.quantity"] } },
//           totalQuantity: { $sum: "$products.quantity" },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             year: "$_id.year",
//             month: "$_id.month",
//           },
//           products: {
//             $push: {
//               product: "$_id.product",
//               totalSellPrice: "$totalSellPrice",
//               totalCostPrice: "$totalCostPrice",
//               totalQuantity: "$totalQuantity",
//               difference: { $subtract: ["$totalSellPrice", "$totalCostPrice"] },
//             },
//           },
//           totalAmount: { $sum: "$totalSellPrice" },
//         },
//       },
//       { $sort: { "_id.year": 1, "_id.month": 1 } },
//     ]).then((result) => {
//       console.log(result);
//       if (result.length > 0) {
//         // Filtrar los productos vendidos del usuario conectado
//         const filteredResult = result.map((item) => {
//           const filteredProducts = item.products.filter((product) => product.productOwner === userId);
//           return { ...item, products: filteredProducts };
//         });

//         res.json({
//           ok: true,
//           result: filteredResult,
//         });
//       } else {
//         res.json({
//           ok: false,
//           msg: "No existen ventas registradas",
//         });
//       }
//     });
//   } catch (error) {
//     res.json({
//       ok: false,
//       msg: error,
//     });
//   }
// };

ctrlSales.getAmountForUserAndDate = async (req, res) => {
  try {
    const userId = req.user._id.toString(); // Toma el ID del usuario ingresado
    console.log(userId);

    const { month, year } = req.query;
    console.log(month, year);

    Sale.aggregate([
      {
        $unwind: "$products", // Desenrollar el array de productos
      },
      {
        $match: { "products.productOwner": userId }, // Filtrar los productos del usuario
      },
      {
        $addFields: {
          saleDate: {
            $dateToString: {
              format: "%Y-%m",
              date: "$date",
            },
          },
        },
      },
      {
        $match: { saleDate: `${year}-${month}` },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          products: {
            $push: {
              product: "$products",
              difference: {
                $subtract: [
                  { $toInt:  {$multiply:["$products.sellPrice","$products.quantity"]}},
                  { $toInt:  {$multiply:["$products.costPrice","$products.quantity"]} },
                ],
              },
              productUserAmount: {
                $sum: {
                  $multiply: [
                    "$products.sellPrice",
                    { $toInt: "$products.quantity" },
                  ],
                },
              },
              costPriceAmount: {
                $sum: {
                  $multiply: [
                    "$products.costPrice",
                    { $toInt: "$products.quantity" },
                  ],
                },
              },
              totalQuantity: { $sum: { $toInt: "$products.quantity" } },
              saleDate: { $min: "$date" },
            },
          },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]).then((result) => {
      console.log(result);
      if (result.length > 0) {
        res.json({
          ok: true,
          result: result,
        });
      } else {
        res.json({
          ok: false,
          msg: "No existen ventas registradas",
        });
      }
    });
  } catch (error) {
    res.json({
      ok: false,
      msg: error,
    });
  }
};


ctrlSales.getSalesForDate = async (req, res) => {
  const { month, year } = req.query;

  const regex = new RegExp(`\\b${month}\\b.*\\b${year}\\b`, "i");
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  // Hacer la consulta con Mongoose

  // Hacer la consulta con Mongoose
  Sale.find({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  })

    .then((resultados) => {
      if (resultados.length > 0) {
        const totalAmount = resultados.reduce(
          (total, sale) => total + sale.totalAmount,
          0
        );

        res.json({
          ok: true,
          filterSales: resultados,
          amount: totalAmount,
        });
      } else {
        res.json({
          ok: false,
          msg: "No hay archivos con esa fecha",
        });
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
