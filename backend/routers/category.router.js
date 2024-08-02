const express = require("express");
const router = express.Router();          // Bu değişkenin bir Router olduğunu belirttik.
const Category = require("../models/category");
const { v4: uuidv4 } = require("uuid");


// KATEGORİ EKLEME
router.post("/add", async(req, res) => {
    try {
        
        const {name} = req.body;            // Gelen kategori ismini body içerisinde aldık.

        // Kayıt yapılırken kategori isminin unique olmasını sağlayan kontrolü yazdık.
        const checkName = await Category.findOne({name: name});
        if(checkName != null){
            res.status(403).json({message: "Bu kategori adı daha önce kullanılmış!"});
        }else{
            // Kategoriyi hazırladık.
            const category = new Category({
                _id: uuidv4(),                  // Verilen id değerinin unique bir değer olmasını sağlar.
                name: name                      // Kategoriye isim verilir.
            });
            await category.save();              // Kategorinin kaydedilmesini sağlar.
            res.json({message: "Kategori kaydı başarıyla tamamlandı."})
        }

    } catch (error) {
        // API isteğinde hata olduğunda(status = 500) geriye hata mesajı döndürür.
        res.status(500).json({message: error.message})
    }
});


// KATEGORİ SİLME
router.post("/removeById", async(req, res) => {
    try {
        
        const {_id} = req.body;                     // Body içerisinde id gelir.
        await Category.findByIdAndDelete(_id);      // Kategorinin silinmesini sağlar.
        res.json({message: "Kategori kaydı başarıyla silindi!"})

    } catch (error) {
        // API isteğinde hata olduğunda(status = 500) geriye hata mesajı döndürür.
        res.status(500).json({message: error.message})
    }
});


// KATEGORİ GÜNCELLEME
router.post("/update", async(req, res) => {
    try {

        const {_id, name} = req.body;                           // Body içerisinde id ve kategori ismi gelir.
        const category = await Category.findOne({_id: _id});    // İlgili kategori bulunur.

        // Güncelleme yapılırken kategori isminin unique olmasını sağlayan kontrolü yazdık.        
        if(category.name != name){
            const checkName = await Category.findOne({name: name});
            if(checkName != null){
                res.status(403).json({message: "Bu kategori adı daha önce kullanılmış!"});
            }else{
                category.name = name;                                   // Mevcut kategori ismi değiştirilir.
                await Category.findByIdAndUpdate(_id, category);        // Kategorinin güncellenmesini sağlar.
                res.json({message: "Kategori kaydı başarıyla güncellendi!"})
            }
        }
        
    } catch (error) {
        // API isteğinde hata olduğunda(status = 500) geriye hata mesajı döndürür.
        res.status(500).json({message: error.message})
    }
});


// KATEGORİLERİ LİSTELEME
router.get("/", async(req, res) => {
    try {
        
        const categories = await Category.find().sort({name: 1});       // Kategorilerin alfabetik sıraya göre listelenmesini sağlar.
        res.json(categories);
        
    } catch (error) {
        // API isteğinde hata olduğunda(status = 500) geriye hata mesajı döndürür.
        res.status(500).json({message: error.message})
    }
});


// Oluşturduğumuz router'ın dışarıdan erişilebilmesini sağladık.
module.exports = router;