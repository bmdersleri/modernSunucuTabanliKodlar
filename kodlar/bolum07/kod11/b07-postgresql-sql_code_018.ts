// File: ConstraintKontrolu.typescript
import { Pool } from "pg";

// Veritabanı kuralı uygulamadan bağımsız çalışır.
// Hata kodu kullanıcıya doğrudan gösterilmemelidir.
// Uygulama anlamlı hata mesajı üretmelidir.

const baglantiHavuzu = new Pool({
  connectionString: process.env.VERITABANI_BAGLANTI_METNI,
});

async function yinelenenEpostaDenemesi(): Promise<void> {
  try {
    await baglantiHavuzu.query(
      "INSERT INTO uyeler (ad_soyad, eposta, yas) VALUES ($1, $2, $3);",
      ["Deniz Akın", "deniz@example.com", 20]
    );

    await baglantiHavuzu.query(
      "INSERT INTO uyeler (ad_soyad, eposta, yas) VALUES ($1, $2, $3);",
      ["Başka Deniz", "deniz@example.com", 22]
    );
  } catch {
    console.log("Bu e-posta adresi zaten kayıtlıdır.");
    // Çıktı: Bu e-posta adresi zaten kayıtlıdır.
  } finally {
    await baglantiHavuzu.end();
  }
}

yinelenenEpostaDenemesi();
