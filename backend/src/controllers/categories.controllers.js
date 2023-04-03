const Categories = require("../models/Categories");
const path = require("path");
const cloudinary = require("cloudinary");

const ctrlCategories = {};

cloudinary.config({
  cloud_name: "dhkfu9w3i",
  api_key: "219851515994576",
  api_secret: "F8ciqQEd-u9C4bqQJqhI4ztomPg",
});

const fs = require("fs-extra");

ctrlCategories.createCategory = async (req, res) => {
  const { name, description, subCategories } = req.body;

  const result = await cloudinary.v2.uploader.upload(req.file.path);

  imgURL = result.url;
  const newCategory = new Categories({
    name,
    description,
    subCategories,
    imgURL
  });

  const categorySaved = await newCategory.save();

  //borra el archivo ya que ha sido subido a la nube
  await fs.unlink(req.file.path);

  res.status(201).json(categorySaved);
};


module.exports = ctrlCategories