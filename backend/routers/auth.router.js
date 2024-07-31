const express = require("express");
const User = require("../models/user");
const router = express.Router();            // Bu değişkenin bir Router olduğunu belirttik.
const { v4:uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");


const secretKey = "My Secret Key My Secret Key 1234.";
const options = {
    // API isteğinin geçerlilik süresini belirttik.
    expiresIn: "1d"
};


router.post("/register", async(req, res) => {
    try {


        // Body içerisinde gelen bilgilerin oluşturduğumuz User collection bilgileri ile eşleşmesini sağlar.
        const user = new User(req.body);   
        user._id = uuidv4();                // Verilen id değerinin uniq bir değer olmasını sağlar.
        user.createdDate = new Date();
        user.isAdmin = false;


        // Oluşturulan User'ın database tarafına kaydedilmesini sağlar.
        await user.save();


        // Register işleminden sonra geriye bir token değerinin döndürülmesini sağlar.
        const token = jwt.sign({}, secretKey, options);
        let model = {token: token, user: user};
        res.json(model);

        
    } catch (error) {
        // API isteğinde hata olduğunda(status = 500) geriye hata mesajı döndürür.
        res.status(500).json({message: error.message});
    }
})


// Oluşturduğumuz router'ın dışarıdan erişilebilmesini sağladık.
module.exports = router;
