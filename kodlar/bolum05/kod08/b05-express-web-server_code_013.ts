import express, { Request, Response } from "express";

// Body verisinin beklenen alanları tanımlanır.
// Alanlar önce unknown kabul edilerek doğrulanabilir.
// JSON middleware'i body okunmadan önce eklenir.
interface YeniKitapIstekVerisi {
  ad?: unknown;
  yazar?: unknown;
  kategori?: unknown;
}

const uygulama = express();
const portNumarasi = 3000;
const kitapListesi = [];

uygulama.use(express.json());

uygulama.post("/kitaplar", (istek: Request, yanit: Response) => {
  // Ağdan gelen body güvenilir kabul edilmez.
  // Her alanın metin olup olmadığı kontrol edilir.
  // Hatalı veri için 400 durum kodu döndürülür.
  const kitapVerisi = istek.body as YeniKitapIstekVerisi;

  if (
    typeof kitapVerisi.ad !== "string" ||
    typeof kitapVerisi.yazar !== "string" ||
    typeof kitapVerisi.kategori !== "string"
  ) {
    yanit.status(400).json({
      mesaj: "ad, yazar ve kategori metin olarak gönderilmelidir."
    });
    return;
  }

  const yeniKitap = {
    kimlik: kitapListesi.length + 1,
    ad: kitapVerisi.ad,
    yazar: kitapVerisi.yazar,
    kategori: kitapVerisi.kategori
  };

  kitapListesi.push(yeniKitap);
  yanit.status(201).json(yeniKitap);
});

uygulama.listen(portNumarasi, () => {
  // Uygulama kitap ekleme endpoint'ini dinler.
  // İstemci Content-Type: application/json göndermelidir.
  // Başarılı ekleme 201 Created üretir.
  console.log(`Sunucu http://localhost:${portNumarasi} adresinde çalışıyor.`);
});

// Çıktı: POST /kitaplar -> 201 {"kimlik":1,"ad":"Java Temelleri",...}
