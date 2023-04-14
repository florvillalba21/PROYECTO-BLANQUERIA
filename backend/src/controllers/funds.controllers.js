
const Fund = require('../models/Fund')

ctrlFunds = {}


ctrlFunds.newFund = async (req, res) => {

    const { mount, date } = req.body;
    const user = req.user._id
    
    // const username = await Fund.findOne({user}).populate("user")

    // console.log(username)
    
    const newFund = new Fund({
      user,
      mount,
      date
      
    });
  
    const fundSaved = await newFund.save();
  
    res.status(201).json(fundSaved);
  };

  ctrlFunds.getFundsForUserId = async (req,res)=>{

    const user = req.user._id //toma el id del usuario ingresado
    
    const filterFunds = await Sale.find({user})
    
  
    return res.json({
        message:`Ventas del usuario ${req.user.username}`,
        filterFunds
    })
  }

  ctrlFunds.getFunds = async (req, res) => {
    try {
  
      const funds = await Fund.find();
  
      res.status(200).json(funds)
    } catch (error) {
      console.log(error);
    }
  };

  module.exports = ctrlFunds