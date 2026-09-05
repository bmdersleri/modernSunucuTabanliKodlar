// File: KitapCrud.typescript
import { Pool } from "pg";

// Parametreler SQL enjeksiyonunu önlemeye yardım eder.
// $1 ve $2 değerleri sorgu metninden ayrı gönderilir.
// Aynı örnek önceki kitaplık tablosunu kullanır.

const baglantiHavuzu = new Pool({
  connectionString: process.env.VERITABANI_BAGLANTI_METNI,
});

async function kitapEkleVeListele(): Promise<void> {
  await baglantiHavuzu.query(
    `INSERT INTO kitaplar (kitap_adi, yazar_adi, yayin_yili)
     VALUES ($1, $2, $3);`,
    ["Kürk Mantolu Madonna", "Sabahattin Ali", 1943]
  );

  const sonuc = await baglantiHavuzu.query(
    `SELECT kitap_adi, yazar_adi
     FROM kitaplar
     WHERE yayin_yili >= $1;`,
    [1900]
  );

  console.table(sonuc.rows);
  // Çıktı: kitap_adi ve yazar_adi sütunlarını içeren tablo
}

kitapEkleVeListele().finally(() => baglantiHavuzu.end());
