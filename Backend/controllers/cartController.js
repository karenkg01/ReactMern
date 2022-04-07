const { ProductModel, CartModel, UserModel, OrderModel } = require('../models/schema')


const errorMessage = (err) => {
    if (err.message) {
        return err.message;
    } else {
        return err;
    }
}



module.exports.addToCart = async (req, res) => {
    try{
        const PRODUCTID = req.body.productID;
        const QUANTITY = req.body.quantity;

        if(!PRODUCTID || !QUANTITY){
            res.status(500).json("Must include productId and Quantity")
            return false;
        } 
        const alreadyInCart = await CartModel.findOne({productID: PRODUCTID})  //findOne returns an array, find - returns an object
        if(alreadyInCart){
            await CartModel.findOneAndUpdate({productID: PRODUCTID}, {quantity: alreadyInCart.quantity + QUANTITY})
            res.status(200).json({status: "success", message:"product quantity increased successfully"})

        }else{
            await CartModel.create({productID: PRODUCTID , quantity: QUANTITY})
            res.status(200).json({status: "success", message:"product added to cart successfully"})

        }
    
    }catch(err){
            res.status(500).json(errorMessage(err))
            console.log(err);
    }
    
}


module.exports.getCartInfo = async (req, res) => {
    try {
        const currentUser = await UserModel.findById(req.body.userId)
        const cartList = await CartModel.find({userId: req.body.userId})
        res.status(200).json({ status: "success", 
            user: {
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email,
            },
            cart: cartList
        })

    } catch (err) {
        res.status(500).json(errorMessage(err))
        console.log(err);
    }

}

module.exports.getAllCartInfo = async (req, res) => {
    try {
        const cartList = await CartModel.find({})
        res.status(200).json({ status: "success", cartList})

    } catch (err) {
        res.status(500).json(errorMessage(err))
        console.log(err);
    }

}
//Go Back To this, to make User work
module.exports.addOrder = async (req, res) => {
    try{ 
        const EMAIL= req.body.email;

        const userExist = await UserModel.find({email: EMAIL})
        console.log("user Exist: ", userExist);
        if(userExist.length === 0){
            await OrderModel.create({
                user: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: req.body.password,
                    email: req.body.email,
                },
                orderPlacedOn: Date.now(),
                isDelivered: false,
                cart: req.body.cart,
            });
        }else{
            await OrderModel.create({
                userID: EMAIL,
                orderPlacedOn: Date.now(),
                isDelivered: false,
                cart: req.body.cart,
            });
        }
        res.status(200).json({ status: "success", message: "order placed successfully"})
    
    }catch(err){
            res.status(500).json(errorMessage(err))
            console.log(err);
    }
    
}





