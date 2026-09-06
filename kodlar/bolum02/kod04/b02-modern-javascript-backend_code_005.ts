// Dosya: uygulama.ts
// Bu dosya uygulamanın giriş noktasıdır.
// Servis katmanı üzerinden kullanıcıya ulaşır.
// Veri deposunun iç ayrıntılarını doğrudan kullanmaz.

import { aktifKullaniciGetir } from "./kullanici-servisi.js";

try {
  const kullanici = aktifKullaniciGetir(1);
  console.log(`${kullanici.ad} için işlem başlatıldı.`);
} catch (hata) {
  console.error("İşlem tamamlanamadı:", hata);
}

// Çıktı: Elif için işlem başlatıldı.
