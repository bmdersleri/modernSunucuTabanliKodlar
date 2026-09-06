// File: JoinSorgulari.typescript
import { Pool } from "pg";

// INNER JOIN eşleşen kayıtları listeler.
// LEFT JOIN eksik ilişkileri görünür kılar.
// console.table sonuç farkını incelemeyi kolaylaştırır.

const baglantiHavuzu = new Pool({
  connectionString: process.env.VERITABANI_BAGLANTI_METNI,
});

async function yazarKitapRaporuOlustur(): Promise<void> {
  const icBirlesim = await baglantiHavuzu.query(
    `SELECT y.ad_soyad, k.kitap_adi
     FROM yazarlar AS y
     INNER JOIN kitaplar AS k ON k.yazar_id = y.yazar_id;`
  );

  const solBirlesim = await baglantiHavuzu.query(
    `SELECT y.ad_soyad, k.kitap_adi
     FROM yazarlar AS y
     LEFT JOIN kitaplar AS k ON k.yazar_id = y.yazar_id;`
  );

  console.table(icBirlesim.rows);
  console.table(solBirlesim.rows);
  // Çıktı: İkinci tabloda kitabı olmayan yazarlar da görünür.
}

yazarKitapRaporuOlustur().finally(() => baglantiHavuzu.end());
