const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    name: String,      // Product name
    item: String,      // Item ID or name
    quantity: Number,  
    price: Number,     
    image: String,     
    category: String,  
    userId: String,    // Optional: if you want carts per user
});

const CartModel = mongoose.model("carts", CartSchema);

module.exports = CartModel;
