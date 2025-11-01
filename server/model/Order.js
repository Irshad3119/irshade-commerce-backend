const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  altMobileNumber: { type: String },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  nation: { type: String, required: true },
  pincode: { type: String, required: true },
  paymentMethod: { type: String, required: true },

  // ✅ New field
  status: {
    type: String,
    enum: ["Processing","On the way", "Delivered" ],
    default: "Processing",
  },

  createdAt: { type: Date, default: Date.now },
});

const OrderModel = mongoose.model("orders", OrderSchema);
module.exports = OrderModel;
