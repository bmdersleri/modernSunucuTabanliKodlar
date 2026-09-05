import express, { Request, Response } from "express";

// Express uygulamasını oluşturur.
// Sunucunun dinleyeceği port numarasını tanımlar.
// Bu örnek tarayıcıdan gelen temel isteği karşılar.
const uygulama = express();
const portNumarasi = 3000;

uygulama.get("/", (istek: Request, yanit: Response) => {
  // Ana sayfaya gelen GET isteğini karşılar.
  // send metodu düz metin yanıtı gönderir.
  // Tarayıcı bu metni doğrudan görüntüler.
  yanit.send("Kitap API sunucusu çalışıyor.");
});

uygulama.listen(portNumarasi, () => {
  // Sunucu dinlemeye başladığında konsola bilgi verir.
  // localhost yalnızca yerel bilgisayarı ifade eder.
  // Tarayıcıdan http://localhost:3000 adresi açılabilir.
  console.log(`Sunucu http://localhost:${portNumarasi} adresinde çalışıyor.`);
});

// Çıktı: Sunucu http://localhost:3000 adresinde çalışıyor.
