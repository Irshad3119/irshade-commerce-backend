

  const mongoose = require("mongoose");

  const CategorySchema = new mongoose.Schema({
    name: String,    // Category name
    description: String ,                          // Optional details
    image: String  ,                               // Optional category image
  })

  const CategoryModel = mongoose.model("categories", CategorySchema);

  module.exports = CategoryModel;
