const Product = require('../models/Product')

ctrlProducts = {};

ctrlProducts.createProduct = async (req, res) => {
    const {name, category, price, imgURL} = req.body 

    const newProduct = new Product ({name, category, price, imgURL})

    const productSaved = await newProduct.save()

    //el codigo de status 201 especifica q un nuevo recurso se ha creado 
    res.status(201).json(productSaved)
};

ctrlProducts.getProducts = (req, res) => {

};

ctrlProducts.getProductById = (req, res) => {

};

ctrlProducts.updateProductById = (req, res) => {

};

ctrlProducts.deleteProductById = (req, res) => {

};

module.exports = ctrlProducts;
