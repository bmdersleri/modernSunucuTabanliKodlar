import express, { Request, Response } from "express";

// Kitap alanları API'nin veri sözleşmesini tanımlar.
// Liste bellekte tutulduğu için uygulama yeniden başlayınca sıfırlanır.
// Query değerleri isteğe bağlı kabul edilir.
interface Kitap {
  kimlik: number;
  ad: string;
  kategori: string;
}

const uygulama = express();
const portNumarasi = 3000;

const kitapListesi: Kitap[] = [
  { kimlik: 1, ad: "Algoritmalar", kategori: "Programlama" },
  { kimlik: 2, ad: "Osmanlı Tarihi", kategori: "Tarih" },
  { kimlik: 3, ad: "TypeScript Başlangıç", kategori: "Programlama" }
];

uygulama.get("/kitaplar", (istek: Request, yanit: Response) => {
  // Query değeri string, dizi veya undefined olabilir.
  // Bu örnekte yalnızca string olan kategori kullanılır.
  // Filtre yoksa tüm kitaplar döndürülür.
  const kategori = typeof istek.query.kategori === "string"
    ? istek.query.kategori
    : undefined;

  const filtrelenmisKitaplar = kategori
    ? kitapListesi.filter((kitap) => kitap.kategori === kategori)
    : kitapListesi;

  yanit.json({
    toplamKayit: filtrelenmisKitaplar.length,
    kitaplar: filtrelenmisKitaplar
  });
});

uygulama.listen(portNumarasi, () => {
  // Query parametresi URL üzerinden gönderilir.
  // Örnek adres localhost:3000/kitaplar?kategori=Programlama olur.
  // Sunucu başarılı şekilde başlatılır.
  console.log(`Sunucu http://localhost:${portNumarasi} adresinde çalışıyor.`);
});

// Çıktı: GET /kitaplar?kategori=Programlama -> 2 kitap
