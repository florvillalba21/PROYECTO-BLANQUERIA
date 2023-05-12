const { model, Schema } = require("mongoose");


const CategoriesSchema = new Schema
  ({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false
    },
    imgURL:{
      type: String
    }
  },
  { versionKey: false });

module.exports = model("Category", CategoriesSchema);
