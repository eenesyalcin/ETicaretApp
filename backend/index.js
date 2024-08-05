// API istekleri için express kütüphanesini dahil ettik.
const express = require("express");
const app = express();
// Uygulamda cors politikası uygulayabilmek için kütüphanesini dahil ettik.
const cors = require("cors");
const connection = require("./database/db");
const path = require("path");


// Yapacağımız tüm API isteklerinin JSON formatında olacağını uygulamaya bildiriyoruz.
app.use(express.json());
app.use(cors());
// Bu yapıyla uploads klasörünü paylaşıma açıyoruz. Eğer paylaşıma açmazsak resimler adres olarak gider fakat okuma olarak gitmezler.
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Oluşturduğumuz API'leri index.js dosyasında tanıttık.
const authRouter = require("./routers/auth.router");
const categoryRouter = require("./routers/category.router");
const productRouter = require("./routers/product.router");

app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);


// Database bağlantısı için oluşturduğumuz methodu çağırdık.
connection();


// Uyguylamanın ayağa kalkabilmesi için bir porta adapte ettik.
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Uygulama http://localhost:5000 portunda ayağa kalktı!"));
