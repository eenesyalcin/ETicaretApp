// API istekleri için express kütüphanesini dahil ettik.
const express = require("express");
const app = express();
// Uygulamda cors politikası uygulayabilmek için kütüphanesini dahil ettik.
const cors = require("cors");


// Yapacağımız tüm API isteklerinin JSON formatında olacağını uygulamaya bildiriyoruz.
app.use(express.json());
app.use(cors());


// Deneme amaçlı bir API isteğinde bulunduk.
app.get("", (req, res) => {
    res.json({message: "API isteği başarılı şekilde çalışıyor."})
});


// Uyguylamanın ayağa kalkabilmesi için bir porta adapte ettik.
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Uygulama http://localhost:5000 portunda ayağa kalktı!"));
