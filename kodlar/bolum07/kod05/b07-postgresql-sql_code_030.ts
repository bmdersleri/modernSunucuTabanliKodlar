// File: ChapterMiniApp.ts
import { Pool } from "pg";

// Bu program küçük bir kitaplık veri erişim katmanıdır.
// Gerçek projede bağlantı metni ortam değişkeninden okunur.
// Her SQL değeri parametreli biçimde gönderilir.

const baglantiHavuzu = new Pool({
  connectionString: process.env.VERITABANI_BAGLANTI_METNI,
});

async function anaProgram(): Promise<void> {
  const veritabaniIstemcisi = await baglantiHavuzu.connect();

  try {
    await veritabaniIstemcisi.query("BEGIN;");

    await veritabaniIstemcisi.query(`
      CREATE TABLE IF NOT EXISTS yazarlar (
        yazar_id SERIAL PRIMARY KEY,
        ad_soyad VARCHAR(120) NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS kitaplar (
        kitap_id SERIAL PRIMARY KEY,
        kitap_adi VARCHAR(150) NOT NULL,
        yazar_id INTEGER NOT NULL REFERENCES yazarlar(yazar_id),
        stok_adedi INTEGER NOT NULL CHECK (stok_adedi >= 0)
      );

      CREATE INDEX IF NOT EXISTS idx_kitaplar_yazar_id
      ON kitaplar (yazar_id);
    `);

    const yazarSonucu = await veritabaniIstemcisi.query(
      `INSERT INTO yazarlar (ad_soyad)
       VALUES ($1)
       ON CONFLICT (ad_soyad)
       DO UPDATE SET ad_soyad = EXCLUDED.ad_soyad
       RETURNING yazar_id;`,
      ["Sait Faik Abasıyanık"]
    );

    const yazarId = yazarSonucu.rows[0].yazar_id;

    await veritabaniIstemcisi.query(
      `INSERT INTO kitaplar (kitap_adi, yazar_id, stok_adedi)
       VALUES ($1, $2, $3);`,
      ["Semaver", yazarId, 3]
    );

    const raporSonucu = await veritabaniIstemcisi.query(
      `SELECT y.ad_soyad, k.kitap_adi, k.stok_adedi
       FROM yazarlar AS y
       LEFT JOIN kitaplar AS k ON k.yazar_id = y.yazar_id
       WHERE y.yazar_id = $1;`,
      [yazarId]
    );

    await veritabaniIstemcisi.query("COMMIT;");

    console.table(raporSonucu.rows);
    // Çıktı: Sait Faik Abasıyanık | Semaver | 3
  } catch (hata) {
    await veritabaniIstemcisi.query("ROLLBACK;");
    console.error(`İşlem tamamlanamadı: ${(hata as Error).message}`);
  } finally {
    veritabaniIstemcisi.release();
    await baglantiHavuzu.end();
  }
}

anaProgram();
