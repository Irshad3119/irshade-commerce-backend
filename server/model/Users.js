const mongoose = require('mongoose')

const Userschema = new mongoose.Schema({
    name: String,
    item: String,
    quantity: Number,
    price: Number,
    image: String,
    category: String

})

const UserModel = mongoose.model("users", Userschema)
module.exports = UserModel
