// Dosya: promise-durumlari.ts
// Bu örnek gecikmeli kullanıcı verisi getirme işlemini temsil eder.
// Union type başarı ve hata senaryolarını açıkça tanımlar.
// then, catch ve finally blokları Promise yaşam döngüsünü işler.

interface KullaniciBilgisi {
  kimlik: number;
  ad: string;
}

type KullaniciSonucu =
  | { basarili: true; kullanici: KullaniciBilgisi }
  | { basarili: false; mesaj: string };

function gecikmeliKullaniciGetir(kimlik: number): Promise<KullaniciSonucu> {
  return new Promise((coz, reddet) => {
    setTimeout(() => {
      if (kimlik === 1) {
        coz({ basarili: true, kullanici: { kimlik: 1, ad: "Meliha" } });
      } else if (kimlik < 0) {
        reddet(new Error("Kimlik değeri negatif olamaz."));
      } else {
        coz({ basarili: false, mesaj: "Kullanıcı bulunamadı." });
      }
    }, 300);
  });
}

gecikmeliKullaniciGetir(1)
  .then((sonuc) => {
    if (sonuc.basarili) {
      console.log(`Kullanıcı: ${sonuc.kullanici.ad}`);
    } else {
      console.log(`İş kuralı sonucu: ${sonuc.mesaj}`);
    }
  })
  .catch((hata: unknown) => {
    console.error("Teknik hata:", hata);
  })
  .finally(() => {
    console.log("Kullanıcı sorgusu tamamlandı.");
  });

// Çıktı: Kullanıcı: Meliha
// Çıktı: Kullanıcı sorgusu tamamlandı.
