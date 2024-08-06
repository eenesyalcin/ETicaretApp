const mongoose = require("mongoose");

// Oluşturacağımız Product collection için şema oluşturduk.
const productSchema = new mongoose.Schema({
    _id: String,
    name: String,
    imageUrls: Array,
    stock: Number,
    price: Number,
    createdDate: Date,
    isActive: Boolean,
    categories: [{type: String, ref: "Category"}]
});

// Şemadan Product(collection) oluşturduk.
const Product = mongoose.model("Product", productSchema);

// Oluşturduğumuz Product'ın dışarıdan erişilebilmesini sağladık.
module.exports = Product;
