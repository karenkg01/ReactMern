const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid').v4;
const {ProductModel} = require('../models/schema')


const errorMessage = (err)=>{
    if(err.message){
        return err.message;
    }else{
        return err;
    }
}
//We Are Here
module.exports.addProduct = async (req, res) => {
    try{
        const NAME = req.body.name;
        const productExist = await ProductModel.findOne({name: NAME})  //findOne returns an array, find - returns an object
        if(productExist){
            throw new Error("Product with that Name Already Exist.")
        }
    
        await ProductModel.create({
            name: NAME,
            category: req.body.category,
            price: req.body.price,
            discountPrice: req.body.discountPrice,
            description: req.body.description,
            image: req.file.filename,
            createdOn: req.body.createdOn,
            isTopProduct: req.body.isTopProduct,
        });
        console.log(res) 
    }catch(err){
            res.status(500).json(errorMessage(err))
            console.log(err);
    }finally{
        res.status(200).json({status: "success", message:"product created successfully"})
    }
    
}

module.exports.getProducts = async (req, res) => {
    try{
        const productList = await ProductModel.find({})
        console.log("productList", productList)
        res.status(200).json({status: "success", products: productList})

    }catch(err){
            res.status(500).json(errorMessage(err))
            console.log(err);
    }
    
}

module.exports.getProductById = async (req, res) => {
    try{
        const product = await ProductModel.findById(req.params.id)
        res.status(200).json({status: "success", product})

    }catch(err){
            res.status(500).json(errorMessage(err))
            console.log(err);
    }
    
}

module.exports.deleteProductById = async (req, res) => {
    try{
        const product = await ProductModel.findByIdAndDelete(req.params.id)
        res.status(200).json({status: "success", message: "product deleted successfully"})

    }catch(err){
            res.status(500).json(errorMessage(err))
            console.log(err);
    }
    
}

module.exports.updateProductById = async (req, res) => {
    try {
        const PRODUCT = await  ProductModel.findById(req.params.id);
        const newData = {
            name: req.body.name || PRODUCT.name,
            category: req.body.category || PRODUCT.category,
            price: req.body.price || PRODUCT.price,
            discountPrice: req.body.discountPrice || PRODUCT.discountPrice,
            description: req.body.description || PRODUCT.description,
            image: req.body.image || PRODUCT.image,
            isTopProduct: req.body.isTopProduct || PRODUCT.isTopProduct,
            
        } 
        await ProductModel.findByIdAndUpdate(req.params.id, newData)
        const newProduct = await  ProductModel.findById(req.params.id);

        const updateProduct = {
            name: newProduct.name,
            category: newProduct.category,
            price: newProduct.price,
            discountPrice: newProduct.discountPrice,
            description: newProduct.description,
            image: newProduct.image,
            isTopProduct: newProduct.isTopProduct,
        }
        res.status(200).json({status: "success", product: updateProduct })
    } catch (err) {
        res.status(500).json(err)
        console.log(err);
    }
}