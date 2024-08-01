const mongoose = require("mongoose");

// Oluşturacağımız Category collection için şema oluşturduk.
const categorySchema = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true,
        unique: true
    }
});

// Şemadan Category(collection) oluşturduk.
const Category = mongoose.model("Category", categorySchema);

// Oluşturduğumuz Category'nin dışarıdan erişilebilmesini sağladık.
module.exports = Category;
