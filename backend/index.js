// API istekleri için express kütüphanesini dahil ettik.
const express = require("express");
const app = express();
// Uygulamda cors politikası uygulayabilmek için kütüphanesini dahil ettik.
const cors = require("cors");
const connection = require("./database/db");


// Yapacağımız tüm API isteklerinin JSON formatında olacağını uygulamaya bildiriyoruz.
app.use(express.json());
app.use(cors());


// Oluşturduğumuz API'yi index.js dosyasında tanıttık.
const authRouter = require("./routers/auth.router");
app.use("/api/auth", authRouter);


// Database bağlantısı için oluşturduğumuz methodu çağırdık.
connection();


// Uyguylamanın ayağa kalkabilmesi için bir porta adapte ettik.
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Uygulama http://localhost:5000 portunda ayağa kalktı!"));
