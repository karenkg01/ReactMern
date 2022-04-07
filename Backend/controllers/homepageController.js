const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid').v4;
const { ProductModel } = require('../models/schema')


const errorMessage = (err) => {
    if (err.message) {
        return err.message;
    } else {
        return err;
    }
}



module.exports.getBanner = async (req, res) => {
    try {
        const productList = await ProductModel.find({})
        res.status(200).json({ status: "success", products: productList.reverse().filter((item, index) => index < 3) })

    } catch (err) {
        res.status(500).json(errorMessage(err))
        console.log(err);
    }

}

module.exports.getCategories = async (req, res) => {
    try {
        const productList = await ProductModel.find({})
        let result = [];
        const randomCategory = () => {
            let found = 0
            let limit = 3
            let length = productList.length
            const getRandom = () => {
                let number = Math.floor(Math.random() * length) //Math.random(): A number between 0 and 1 Multiply by length of the array
                //if the result does Not already include this number, the following happens..
                let category = productList[number].category
                // console.log('rand:', number)
                // console.log('category: ', category)
                result.push(category)
            
                if (result.length < limit) {
                    getRandom()
                } else {
                 
                    res.status(200).json({ status: "success", categories: result })
                }
            }
            getRandom()
        }
        randomCategory()
    } catch (err) {
        res.status(500).json(errorMessage(err))
        console.log(err);
    }

}
module.exports.getAllCategories = async (req, res) => {
    try {
  
        const productList = await ProductModel.find({})
        let result = []
        productList.forEach(value => {
            if(!result.includes(value)){
                result.push(value)
            }
        })
        res.status(200).json(result)
        
    } catch (err) {
        res.status(500).json(errorMessage(err))
        console.log(err);
    }

}

module.exports.getProducts = async (req, res) => {
    try {
        const productList = await ProductModel.find({})
        let result = [];
        const randomCategory = () => {
            let found = 0
            let limit = 8
            let length = productList.length
            const getRandom = () => {
                let number = Math.floor(Math.random() * length) //Math.random(): A number between 0 and 1 Multiply by length of the array
                //if the result does Not already include this number, the following happens..
                result.push(productList[number])
            
                if (result.length < limit) {
                    getRandom()
                } else {
                 
                    res.status(200).json({ status: "success", products: result })
                }
            }
            getRandom()
        }
        randomCategory()
    } catch (err) {
        res.status(500).json(errorMessage(err))
        console.log(err);
    }

}




