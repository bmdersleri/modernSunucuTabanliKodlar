import express, { Request, Response } from "express";

// Uygulama nesnesi API isteklerini karşılar.
// JSON yanıtı istemcilerin veriyi kolay işlemesini sağlar.
// Port sabiti uygulamanın giriş noktasını belirler.
const uygulama = express();
const portNumarasi = 3000;

uygulama.get("/durum", (istek: Request, yanit: Response) => {
  // json metodu otomatik olarak JSON biçimi üretir.
  // HTTP durum kodu varsayılan olarak 200 olur.
  // Nesne içindeki alanlar API sözleşmesinin parçasıdır.
  yanit.json({
    mesaj: "Kitap API hazır.",
    sunucuDurumu: "çalışıyor"
  });
});

uygulama.listen(portNumarasi, () => {
  // Sunucunun hangi adreste çalıştığını gösterir.
  // Geliştirme ortamında port çakışması kontrol edilmelidir.
  // Tarayıcı veya API istemcisi bu adrese istek gönderebilir.
  console.log(`Sunucu http://localhost:${portNumarasi} adresinde çalışıyor.`);
});

// Çıktı: GET /durum -> {"mesaj":"Kitap API hazır.","sunucuDurumu":"çalışıyor"}
