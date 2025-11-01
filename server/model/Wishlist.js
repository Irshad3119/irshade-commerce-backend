    const mongoose = require("mongoose");

    const WishlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    item: {
        type: mongoose.Schema.Types.ObjectId, // refers to grocery item
        ref: "users",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    });

    const WishlistModel = mongoose.model("wishlists", WishlistSchema);
    module.exports = WishlistModel;
