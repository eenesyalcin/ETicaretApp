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
        const {name, stock, price, categories} = req.body;              // Gelen ürün bilgilerini body içerisinde aldık.
        const productId = uuidv4();                                     // Verilen id değerinin unique bir değer olmasını sağlar.

        const imageUrls = req.files.map(file => file.path);             // Gelen resimlerin URL bilgilerini elde ettik.

        // Ürünü hazırladık.
        let product = new Product({
            _id: productId,
            name: name.toUpperCase(),
            stock: stock,
            price: price,
            categories: categories,
            isActive: true,
            imageUrls: imageUrls,
            createdDate: new Date()
        });

        // Ürünün kaydedilmesini sağlar.
        await product.save();
        res.json({message: "Ürün kaydı başarıyla tamamlandı."});
    });
});


// ÜRÜN SİLME
router.post("/removeById", async(req, res) => {
    response(res, async() => {
        const {_id} = req.body;     // Body içerisinde id gelir.

        // Burada ürünü bulup, o ürüne ait olan tüm resimleri siliyoruz.
        const product = await Product.findById(_id);
        for(const image of product.imageUrls){
            fs.unlink(image.path, () => {});
        }

        // Ürünün silinmesini sağlar.
        await Product.findByIdAndRemove(_id);
        res.json({message: "Ürün kaydı başarıyla silindi!"});
    });
});


// ÜRÜN LİSTELEME ==> (Pagination yapısına uygun!)
router.post("/", async(req, res) => {
    response(res, async() => {
        const {pageNumber, pageSize, search} = req.body;        // Gelen ürün bilgilerini body içerisinde aldık.
        
        // Arama verisine göre kaç adet ürün olduğunu tespit ediyoruz.
        let productCount = await Product.find({
            $or: [
                {
                    // Regex, arama sonucunda içerisinde geçen benzer tüm değerleri getir anlamında kullanılır.
                    name: {$regex: search, $options: 'i'}
                }
            ]
        }).countDocuments();

        // Ürün listesini elde ediyoruz.
        let products = await Product.find({
            $or: [
                {
                    // Regex, arama sonucunda içerisinde geçen benzer tüm değerleri getir anlamında kullanılır.
                    name: {$regex: search, $options: 'i'}
                }
            ]
        })
        .sort({name: 1})                                                // Ürünleri alfabetik olarak sıraladık.
        .populate("categories")                                         // Mevcutta olan katagori tablosunu buna dahil ettik.
        .skip(Math.max(0, (pageNumber - 1) * pageSize))                 // Kaç tane ürün kaydını atlaması gerektiğini belirttik.
        .limit(pageSize);                                               // Kaç tane ürün kaydı alacağını bildirdik.

        let totalPageCount = Math.ceil(productCount / pageSize);        // Toplam sayfa sayısını aldık.

        // Dönecek olan modeli oluşturduk.
        let model = {
            datas: products,
            pageNumber: pageNumber,
            pageSize: pageSize,
            totalPageCount: totalPageCount,
            isFirstPage: pageNumber == 1 ? true : false,
            isLastPage: totalPageCount == pageNumber ? true : false,
        };

        res.json(model);        // Oluşturduğumuz modeli karşı tarafa gönderdik.
    });
});


// ÜRÜNÜN AKTİF-PASİF DURUMUNU DEĞİŞTİRME
router.post("/changeActiveStatus", async(req, res) => {
    response(res, async() => {
        const {_id} = req.body;                             // Body içerisinde id gelir.
        let product = await Product.findById(_id);          // İlgili ürün bulunur.
        product.isActive = !product.isActive;               // Ürünün aktiflik durumunu değiştirdik.

        // Ürünün güncellenmesini sağlar. 
        await Product.findByIdAndUpdate(_id, product);
        if(product.isActive){
            res.json({message: "Ürünün aktif edildi!"});
        }else{
            res.json({message: "Ürünün pasif edildi!"});
        }
    });
});


// ÜRÜN GETİRME ==> (Id' ye göre!)
router.post("/getById", async(req, res) => {
    response(res, async() => {
        const {_id} = req.body;                         // Body içerisinde id gelir.
        let product = await Product.findById(_id);      // İlgili ürün bulunur.
        res.json(product);                              // Ürün geriye döner.
    });
});


// ÜRÜN GÜNCELLEME
router.post("/update", upload.array("images"), async(req, res) => {
    response(res, async() => {
        const {_id, name, stock, price, categories} = req.body;     // Gelen ürün bilgilerini body içerisinde aldık.

        // Burada ürünü bulup, o ürüne ait olan tüm resimleri siliyoruz.
        let product = await Product.findById(_id);
        for(const image of product.imageUrls){
            fs.unlink(image.path, () => {})
        }

        // Yeni eklenen resimlerle beraber değiştirilmeyen resimler tekrardan bir liste altında birleştirildi.
        let imageUrls;
        imageUrls = [...product.imageUrls, ...req.files];

        // Ürün bilgilerini güncelleyerek hazırladık.
        product = {
            name: name.toUpperCase(),
            stock: stock,
            price: price,
            imageUrls: imageUrls,
            categories: categories
        };

        // Ürünün güncellenmesini sağlar.
        await Product.findByIdAndUpdate(_id, product);
        res.json({message: "Ürün kaydı başarıyla güncellendi!"})
    });
});


// ÜRÜN RESMİ SİLME
router.post("/removeImageByProductIdAndIndex", async(req, res) => {
    response(res, async() => {
        const {_id, index} = req.body;                  // Ürüne ait id ve index bilgilerini body içerisinde aldık. Böylece kaçıncı resim olduğunu bilebiliriz.
        let product = await Product.findById(_id);      // Ürünü tespit ediyoruz.

        if(product.imageUrls.length == 1){
            // Ürüne ait tek resim varsa silinmesini engelliyoruz.
            res.status(500).json({message: "Ürüne ait en az 1 tane resim bulunmak zorundadır!"});
        }else{
            let image = product.imageUrls[index];                   // Resmi tespit ettik.           
            product.imageUrls.splice(index, 1);                     // Resmin isimini database tarafından kaldırdık.
            await Product.findByIdAndUpdate(_id, product);          // Ürünü güncelledik.
            fs.unlink(image.path, () => {});                        // Ürün resmini sildik.
            res.json({message: "Resim başarıyla kaldırıldı!"});
        }
    });
});


// Oluşturduğumuz router'ın dışarıdan erişilebilmesini sağladık.
module.exports = router;
