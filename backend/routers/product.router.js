const express = require("express");
const router = express.Router();                                // Bu değişkenin bir Router olduğunu belirttik.
const Product = require("../models/product");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const upload = require("../services/file.service");
const response = require("../services/response.service");

// ÜRÜN EKLEME
router.post("/add", upload.array("images"), async(req, res) => {

    response(res, async() => {
        const {name, stock, price, categories} = req.body;      // Gelen ürün bilgilerini body içerisinde aldık.
        const productId = uuidv4();                             // Verilen id değerinin unique bir değer olmasını sağlar.

        // Ürünü hazırladık.
        let product = new Product({
            _id: productId,
            name: name.toUpperCase(),
            stock: stock,
            price: price,
            categories: categories,
            isActive: true,
            imageUrls: req.file,
            createdDate: new Date()
        });

        // Ürünün kaydedilmesini sağlar.
        await product.save();
        res.json({message: "Ürün kaydı başarıyla tamamlandı."});
    });
});
