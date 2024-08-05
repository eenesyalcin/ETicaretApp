// Birçok yerde kullandığımız try-catch bloklarını generic yapı haline getirmek için response isimli bir yapı oluşturduk.
const response = async(res, callBack) => {
    try {
        // Bu kısımda callBack çağırılır. İçerisinde hangi metotlar varsa onlar çalışır.
        callBack();
    } catch (error) {
        // API isteğinde hata olduğunda(status = 500) geriye hata mesajı döndürür.
        res.status(500).json({message: error.message});
    }
}

// Oluşturduğumuz response yapısının dışarıdan erişilebilmesini sağladık.
module.exports = response;
