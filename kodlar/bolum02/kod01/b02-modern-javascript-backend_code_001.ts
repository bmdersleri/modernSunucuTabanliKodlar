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
  { kimlik: 1, ad: "Ayşe", eposta: "ayse@ornek.com", aktifMi: true, adres: { sehir: "Ankara" } },
  { kimlik: 2, ad: "Mehmet", eposta: "mehmet@ornek.com", aktifMi: false },
  { kimlik: 3, ad: "Deniz", eposta: "deniz@ornek.com", aktifMi: true }
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

// Çıktı: 1: Ayşe - Ankara
// Çıktı: 3: Deniz - Şehir bilgisi yok
