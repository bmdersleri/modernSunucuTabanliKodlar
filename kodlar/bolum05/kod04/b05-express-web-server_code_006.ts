import express, { Request, Response } from "express";

// Kitap verisinin beklenen yapısını tanımlar.
// Örnek veriler uygulama belleğinde tutulur.
// Her route aynı kitap listesini kullanır.
interface Kitap {
  kimlik: number;
  ad: string;
  yazar: string;
  kategori: string;
}

const uygulama = express();
const portNumarasi = 3000;

const kitapListesi: Kitap[] = [
  { kimlik: 1, ad: "Temiz Kod", yazar: "Robert C. Martin", kategori: "Programlama" },
  { kimlik: 2, ad: "Java ile Nesne Yönelimli Programlama", yazar: "Ayşe Demir", kategori: "Programlama" }
];

uygulama.use(express.json());

uygulama.get("/kitaplar", (istek: Request, yanit: Response) => {
  // GET /kitaplar tüm kitapları döndürür.
  // json metodu diziyi JSON biçiminde gönderir.
  // Varsayılan başarı durum kodu 200'dür.
  yanit.json(kitapListesi);
});

uygulama.get("/kitaplar/:kitapKimligi", (istek: Request, yanit: Response) => {
  // URL içindeki parametre metin olarak gelir.
  // Number dönüşümü karşılaştırma için gereklidir.
  // Bulunamayan kaynak için 404 yanıtı gönderilir.
  const kitapKimligi = Number(istek.params.kitapKimligi);
  const bulunanKitap = kitapListesi.find((kitap) => kitap.kimlik === kitapKimligi);

  if (!bulunanKitap) {
    yanit.status(404).json({ mesaj: "Kitap bulunamadı." });
    return;
  }

  yanit.json(bulunanKitap);
});

uygulama.post("/kitaplar", (istek: Request, yanit: Response) => {
  // Body içinden yeni kitap alanları okunur.
  // Gerçek projede ek doğrulamalar da yapılmalıdır.
  // Yeni kaynak oluşturulduğu için 201 kullanılır.
  const { ad, yazar, kategori } = istek.body;

  const yeniKitap: Kitap = {
    kimlik: kitapListesi.length + 1,
    ad,
    yazar,
  };

  kitapListesi.push(yeniKitap);
  yanit.status(201).json(yeniKitap);
});

uygulama.listen(portNumarasi, () => {
  // Sunucu yerel geliştirme ortamında başlatılır.
  // Her route aynı port üzerinden erişilebilir.
  // Çıktı terminalde görüntülenir.
  console.log(`Sunucu http://localhost:${portNumarasi} adresinde çalışıyor.`);
});

// Çıktı: GET /kitaplar -> kitap dizisi
// Çıktı: GET /kitaplar/1 -> Temiz Kod
// Çıktı: POST /kitaplar -> 201 Created
