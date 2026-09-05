// File: OrtamDegiskenliBaglanti.typescript
import { Pool } from "pg";

// Pool çok sayıda istek için bağlantıları yeniden kullanır.
// Parola kaynak kodda değil ortam değişkeninde bulunmalıdır.
// Bu örnek yalnızca bağlantı yapısını gösterir.

const baglantiHavuzu = new Pool({
  connectionString: process.env.VERITABANI_BAGLANTI_METNI,
});

async function sunucuZamaniniGetir(): Promise<void> {
  const sonuc = await baglantiHavuzu.query(
    "SELECT CURRENT_TIMESTAMP AS sunucu_zamani;"
  );

  console.log(sonuc.rows[0].sunucu_zamani);
  // Çıktı: 2026-09-04T10:30:00.000Z
}

sunucuZamaniniGetir().finally(() => baglantiHavuzu.end());
