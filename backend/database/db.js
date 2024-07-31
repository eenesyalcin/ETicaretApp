// Uygulamamıza mongoose kütüphanesini dahil ettik.
const mongoose = require("mongoose");

// Connection string bilgisini bir değişkene atadık.
const uri = "mongodb+srv://mongodbdatabase1234:1@eticaretdb.5qil78w.mongodb.net/?retryWrites=true&w=majority&appName=ETicaretDb";

// Database bağlantısı için bir method yazdık.
const connection = () => {
    mongoose.connect(uri, {

    })
    .then(() => console.log("MongoDb bağlantısı başarılı."))
    .catch((err) => console.log("Bağlantı Hatası! HATA: " + err.message));
}

// Methodun dışarıdan erişilebilmesini sağladık.
module.exports = connection;
