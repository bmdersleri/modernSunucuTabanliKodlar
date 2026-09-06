// File: IndexliArama.typescript
import { Pool } from "pg";

// Sorgu filtreleme alanını kullanır.
// Index gereksinimi EXPLAIN ANALYZE ile doğrulanmalıdır.
// Küçük örnek veriyle fark görünmeyebilir.

const baglantiHavuzu = new Pool({
  connectionString: process.env.VERITABANI_BAGLANTI_METNI,
});

async function yayinYilinaGoreAra(yayinYili: number): Promise<void> {
  const sonuc = await baglantiHavuzu.query(
    `SELECT kitap_adi
     FROM kitaplar
     WHERE yayin_yili = $1;`,
    [yayinYili]
  );

  console.table(sonuc.rows);
  // Çıktı: Belirtilen yayın yılındaki kitaplar listelenir.
}

yayinYilinaGoreAra(1943).finally(() => baglantiHavuzu.end());
