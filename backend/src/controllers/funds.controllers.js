const Fund = require("../models/Fund");

ctrlFunds = {};

ctrlFunds.newFund = async (req, res) => {
  const { amount, date } = req.body;
  const user = req.user._id;

  // const username = await Fund.findOne({user}).populate("user")

  // console.log(username)
  if (amount!= null && date) {
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

ctrlFunds.getFundsForUserId = async (req, res) => {
  const user = req.user._id; //toma el id del usuario ingresado

  const filterFunds = await Fund.find({ user });

  Fund.aggregate([
    {
      $match: { user: user }
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
        totalFunds:filterFunds,
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
          totalFunds:funds,
          totalAmountFunds: fundsTotalAmount,
        });
      })
      .catch((err) => {
        res.json({
          err,
        });
      });
  
  } catch (error) {
    console.log(error);
  }
};

module.exports = ctrlFunds;
