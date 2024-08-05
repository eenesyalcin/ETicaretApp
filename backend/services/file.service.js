const multer = require("multer");

// Kaydedilecek dosya adı ve dosyanın kaydedileceği yerin adını tutacak bir yapı oluşturduk.
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        // Hata olarak null dönmesini ve dosyayı uploads isimli klasöre kaydetmesini söyledik. 
        cb(null, "uploads/")
    },
    filename: function(req, file, cb){
        // Hata olarak null dönmesini ve dosyayı ismi olarak tarihle beraber dosyanın orijinal ismi olmasını söyledik. Bu dosya isminin unique değer olmasıbnu sağlar. 
        cb(null, Date.now() + "-" + file.originalname)
    }
});

// Bir yükleme işlemi tanımladık.
const upload = multer({storage: storage});

// Oluşturduğumuz yükleme işleminin dışarıdan erişilebilmesini sağladık.
module.exports = upload;
