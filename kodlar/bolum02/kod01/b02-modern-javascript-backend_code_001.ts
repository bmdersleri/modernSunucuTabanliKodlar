// Dosya: modern-veri-isleme.ts
// Bu örnek API'den gelen kullanıcı verisini dönüştürür.
// Eksik şehir bilgisi için güvenli bir varsayılan değer kullanılır.
// Çıktı yalnızca aktif kullanıcıların özet listesidir.

interface KullaniciKaydi {
  readonly kimlik: number;
  readonly ad: string;
  readonly eposta: string;
  readonly aktifMi: boolean;
  readonly adres?: { sehir?: string };
}

const kullaniciListesi: KullaniciKaydi[] = [
  { kimlik: 1, ad: "Zeliha", eposta: "zeliha@ornek.com", aktifMi: true,
    adres: { sehir: "Ankara" } },
  { kimlik: 2, ad: "İsmail", eposta: "ismail@ornek.com", aktifMi: false },
  { kimlik: 3, ad: "Bahar", eposta: "bahar@ornek.com", aktifMi: true }
];

const aktifKullaniciOzetleri = kullaniciListesi
  .filter((kullanici) => kullanici.aktifMi)
  .map((kullanici) => {
    const sehir = kullanici.adres?.sehir ?? "Şehir bilgisi yok";
    return `${kullanici.kimlik}: ${kullanici.ad} - ${sehir}`;
  });

for (const kullaniciOzeti of aktifKullaniciOzetleri) {
  console.log(kullaniciOzeti);
}

// Çıktı: 1: Zeliha - Ankara
// Çıktı: 3: Bahar - Şehir bilgisi yok
