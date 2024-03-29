const Fund = require("../models/Fund");

ctrlFunds = {};

ctrlFunds.newFund = async (req, res) => {
  const { amount, date } = req.body;
  const user = req.user._id;

  // const username = await Fund.findOne({user}).populate("user")

  // console.log(username)
  console.log(amount);
  if (amount != null && date) {
    const newFund = new Fund({
      user,
      amount,
      date,
    });
    try {
      const fundSaved = await newFund.save();

      res.status(201).json({
        ok: true,
        fundSaved,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json({
      ok: false,
    });
  }
};

ctrlFunds.getFundsOrderDate = async (req, res) => {
  try {
    Fund.aggregate([
      {
        $lookup: {
          from: "users", // Reemplaza "users" con el nombre de tu colección de usuarios
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          _id: 1,
          date: 1,
          amount: 1,
          user: { $arrayElemAt: ["$user.username", 0] }, // Obtener el nombre de usuario directamente
        },
      },
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          total: { $sum: "$amount" },
          count: { $sum: 1 },
          funds: { $push: "$$ROOT" },
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
          msg: "No existen fondos registrados",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

ctrlFunds.getFundsForDate = async (req, res) => {
  const { month, year } = req.query;

  // regex = new RegExp(`\\b${month}\\b.*\\b${year}\\b`, "i");

  // Hacer la consulta con Mongoose
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  // Hacer la consulta con Mongoose
  Fund.find({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  }).populate("user")

    .then((resultados) => {
      if (resultados.length > 0) {
        const totalAmount = resultados.reduce(
          (total, fund) => total + fund.amount,
          0
        );

        res.json({
          ok: true,
          filterFunds: resultados,
          totalAmount: totalAmount,
        });
      } else {
        res.json({
          ok: false,
          msg: "No hay retiros en esa fecha",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

ctrlFunds.getFundsForUserId = async (req, res) => {
  const user = req.user._id; //toma el id del usuario ingresado
  //busca los fondos del user
  const filterFunds = await Fund.find({ user });

  Fund.aggregate([
    // filtra los documentos de fondo que tienen el id de usuario que se ingresó.
    {
      //matchea el id
      $match: { user: user },
    },
    {
      $group: {
        _id: user,
        fundTotalAmount: { $sum: "$amount" },
      },
    },
  ])
    .then((result) => {
      const fundsTotalAmount = result[0].fundTotalAmount;

      res.json({
        totalFunds: filterFunds,
        fundsUserAmount: fundsTotalAmount,
      });
    })
    .catch((err) => {
      res.json({
        err,
      });
    });
};

ctrlFunds.getFunds = async (req, res) => {
  try {
    const funds = await Fund.find();

    if (funds.length > 0) {
      Fund.aggregate([
        {
          $group: {
            _id: null,
            fundTotalAmount: { $sum: "$amount" },
          },
        },
      ])
        .then((result) => {
          const fundsTotalAmount = result[0].fundTotalAmount;

          res.json({
            totalFunds: funds,
            totalAmountFunds: fundsTotalAmount,
          });
        })
        .catch((err) => {
          res.json({
            err,
          });
        });
    } else {
      res.json({
        ok: false,
        msg: "No hay fondos registrados",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = ctrlFunds;
