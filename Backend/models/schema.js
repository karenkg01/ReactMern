const  mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: false},
    category: { type: String, required: false},
    price: { type: Number, required: false},
    discountPrice: { type: Number, required: false},
    description: { type: String, required: false},
    image: { type: String, required: false},
    createdOn: { type: Date, default: Date.now() },
    isTopProduct: { type: Boolean, required: false},
});

const userSchema = new Schema({
    firstName: { type: String, required: false},
    lastName: { type: String, required: false},
    password: { type: String, required: false},
    email: { type: String, required: true},
    profileImage: { type: String, required: false},
    address: { type: String, required: false},
    city: { type: String, required: false},
    state: { type: String, required: false},
    zipcode: { type: String, required: false},
    isAdmin: { type: Boolean, required: true},
});

const orderSchema = new Schema({
    user: { type: Object, required: false},
    userID: { type: String, required: false},
    orderPlacedOn: { type: String, required: true},
    isDelivered: { type: Boolean, required: true},
    orderDeliveredOn: { type: String, required: false},
    cart: { type: Array, required: true},
});

const cartSchema = new Schema({
    productID: { type: String, required: true},
    userID: { type: String, required: true},
    quantity: { type: Number, required: true},
   
});

const ProductModel = mongoose.model('ProductModel', productSchema)
const UserModel = mongoose.model('UserModel', userSchema)
const OrderModel = mongoose.model('OrderModel', orderSchema)
const CartModel = mongoose.model('CartModel', cartSchema)


module.exports = {ProductModel, UserModel, OrderModel, CartModel};