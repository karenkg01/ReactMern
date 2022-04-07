const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid').v4;
const {OrderModel} = require('../models/schema')


const errorMessage = (err)=>{
    if(err.message){
        return err.message;
    }else{
        return err;
    }
}



module.exports.getOrders = async (req, res) => {
    try{
        const ordersList = await OrderModel.find({})
        res.status(200).json({status: "success", products: ordersList})

    }catch(err){
            res.status(500).json(errorMessage(err))
            console.log(err);
    }
    
}

module.exports.updateOrder = async (req, res) => {
    try {
        const ORDER = await  OrderModel.findById(req.params.id);
        const newData = {
            user: req.body.user || ORDER.user,
            userID: req.body.userID || ORDER.userID,
            orderPlacedOn: req.body.orderPlacedOn || ORDER.orderPlacedOn,
            isDelivered: req.body.isDelivered || ORDER.isDelivered,
            orderDeliveredOn: req.body.orderDeliveredOn || ORDER.orderDeliveredOn,
            cart: req.body.cart || ORDER.cart,
            
        } 
        await OrderModel.findByIdAndUpdate(req.params.id, newData)
       
        res.status(200).json({status: "success", message: "order modified successfully" })
    } catch (err) {
        res.status(500).json(err)
        console.log(err);
    }
}

