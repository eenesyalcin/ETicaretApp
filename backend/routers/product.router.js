const express = require("express");
const router = express.Router();                                // Bu değişkenin bir Router olduğunu belirttik.
const Product = require("../models/product");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// ÜRÜN EKLEME
router.post("/add", async(req, res) => {
    try {
        
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
            createdDate: new Date()
        });

        // Ürünün kaydedilmesini sağlar.
        await product.save();
        res.json({message: "Ürün kaydı başarıyla tamamlandı."});

    } catch (error) {
        // API isteğinde hata olduğunda(status = 500) geriye hata mesajı döndürür.
        res.status(500).json({message: error.message});
    }
});
