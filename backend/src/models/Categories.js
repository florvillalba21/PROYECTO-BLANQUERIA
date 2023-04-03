const { model, Schema } = require("mongoose");
const { type } = require("os");

const CategoriesSchema =
  ({
    name: {
      type: String,
      required: true,
    },
    subcategories: {
      type: Array,
      required: true,
    },
  },
  { versionKey: false });

module.exports = model("Categories", CategoriesSchema);
