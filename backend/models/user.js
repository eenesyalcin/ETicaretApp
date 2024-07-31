const mongoose = require("mongoose");

// Oluşturacağımız collection için şema oluşturduk.
const userShema = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true        // Kullanıcı email'inin unique olmasını sağlar.
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: Boolean,
    createdDate: Date
})

// Bir User(collection) oluşturduk.
const User = mongoose.model("User", userShema);

// Oluşturduğumuz User'ın dışarıdan erişilebilmesini sağladık.
module.exports = User;
