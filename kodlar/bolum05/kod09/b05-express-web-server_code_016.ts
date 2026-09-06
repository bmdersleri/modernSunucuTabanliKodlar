import express, { Request, Response } from "express";

// Kitaplar örnek olarak uygulama belleğinde tutulur.
// Response nesnesi HTTP durumunu ve JSON verisini gönderir.
// Her hata türü için anlamlı mesaj üretilecektir.
const uygulama = express();
const portNumarasi = 3000;

const kitapListesi = [
  { kimlik: 1, ad: "Java Temelleri", yazar: "İsmail Kaya" }
];

uygulama.get("/kitaplar/:kitapKimligi", (istek: Request, yanit: Response) => {
  // Parametre geçerli sayıya dönüştürülür.
  // Geçersiz kimlik istemci hatası olarak değerlendirilir.
  // Bulunamayan kaynak için 404 döndürülür.
  const kitapKimligi = Number(istek.params.kitapKimligi);

  if (Number.isNaN(kitapKimligi)) {
    yanit.status(400).json({
      mesaj: "Kitap kimliği sayısal olmalıdır."
    });
    return;
  }

  const bulunanKitap = kitapListesi.find((kitap) => kitap.kimlik === kitapKimligi);

  if (!bulunanKitap) {
    yanit.status(404).json({
      mesaj: "İstenen kitap bulunamadı."
    });
    return;
  }

  yanit.status(200).json({
    mesaj: "Kitap bulundu.",
    veri: bulunanKitap
  });
});

uygulama.listen(portNumarasi, () => {
  // Sunucu kaynak sorgulama endpoint'ini açar.
  // Aynı endpoint farklı sonuçlar üretebilir.
  // Durum kodu sonucu açık biçimde belirtir.
  console.log(`Sunucu http://localhost:${portNumarasi} adresinde çalışıyor.`);
});

// Çıktı: GET /kitaplar/1 -> 200 OK
// Çıktı: GET /kitaplar/99 -> 404 Not Found
// Çıktı: GET /kitaplar/abc -> 400 Bad Request
