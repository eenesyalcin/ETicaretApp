const express = require("express");
const User = require("../models/user");
const router = express.Router();            // Bu değişkenin bir Router olduğunu belirttik.
const { v4:uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const response = require("../services/response.service");


const secretKey = "My Secret Key My Secret Key 1234.";
const options = {
    // API isteğinin geçerlilik süresini belirttik.
    expiresIn: "1d"
};


// REGISTER API
router.post("/register", async(req, res) => {
    response(res, async() => {
        // Body içerisinde gelen bilgilerin oluşturduğumuz User collection bilgileri ile eşleşmesini sağlar.
        const user = new User(req.body);   
        user._id = uuidv4();                // Verilen id değerinin unique bir değer olmasını sağlar.
        user.createdDate = new Date();
        user.isAdmin = false;

        // Kayıt yapılırken email'in unique olmasını sağlayan kontrolü yazdık.
        const checkUserEmail = await User.findOne({email: user.email});
        if(checkUserEmail != null){
            res.status(403).json({message: "Bu mail adresi daha önce kullanılmış!"});
        }else{
        await user.save();      // Oluşturulan User'ın database tarafına kaydedilmesini sağlar.
        // Register işleminden sonra geriye bir token değerinin döndürülmesini sağlar.
        const token = jwt.sign({}, secretKey, options);
        let model = {token: token, user: user};
        res.json(model);
        }
    });
});


// LOGIN API
router.post("/login", async(req, res) => {
    response(res, async() => {
        const {email, password} = req.body;
        let user = await User.findOne({email: email});
        if(user == null){
            res.status(403).json({message: "Kullanıcı bulunamadı!"});
        }else{
            if(user.password != password){
                res.status(403).json({message: "Şifre yanlış!"});
            }else{
                const token = jwt.sign({}, secretKey, options);
                let model = {token: token, user: user};
                res.json(model);
            }
        }
    });
});


// Oluşturduğumuz router'ın dışarıdan erişilebilmesini sağladık.
module.exports = router;
