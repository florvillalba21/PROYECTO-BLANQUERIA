const { model, Schema } = require("mongoose");


const CategoriesSchema = new Schema
  ({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    subCategories: [{
      type:String
    }],
    imgURL:{
      type: String
    }
  },
  { versionKey: false });

module.exports = model("Categories", CategoriesSchema);
