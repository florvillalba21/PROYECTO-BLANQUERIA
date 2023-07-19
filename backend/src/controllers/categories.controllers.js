const Category = require("../models/Category");
const Products = require("../models/Product");
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
  const { name, description} = req.body;

  if(name){
    
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    imgURL = result.url;
    
    const newCategory = new Category({
      name,
      description,
      imgURL,
    });
  
    try {
      const categorySaved = await newCategory.save();
  
    //borra el archivo ya que ha sido subido a la nube
    await fs.unlink(req.file.path);
  
    res.status(201).json({ ok: true, categorySaved });
    } catch (error) {
      res.status(425).json({
        msg: error
      })
    }
    
  }else{
    return res.json({ok:false})
  }

  
};

ctrlCategories.getCategories = async (req, res) => {
  const categories = await Category.find();

  res.status(200).json(categories);
};

ctrlCategories.getCategoryForId = async (req, res)=>{

  try {
    const category = await Category.find({ _id: req.params.categoryId });
    console.log(category);

    res.status(200).json(category);
    console.log(category);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
}

ctrlCategories.updateCategoryById = async (req, res) => {
  if(req.body){
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.categoryId,
        req.body,
        { new: true }
      );
      res.status(200).json({ok: true, updatedCategory});
    } catch (error) {
      console.log(error)
      res.json({error})
    }
  }else{
    res.json({ok: false})
  }
  
};

//Funcion para borrar un elemento en base al id
ctrlCategories.deleteCategoryById = async (req, res) => {

  try {
    const category = await Category.findById(req.params.categoryId);
    const categoryName = category.name;

    await Products.deleteMany({ category: categoryName });
    const deleteCategory = await Category.findByIdAndDelete(
      req.params.categoryId
    );
    res.status(200).json({ok:true, deleteCategory});
  } catch (error) {
    res.json({ok:false})
  }
  
};

module.exports = ctrlCategories;
