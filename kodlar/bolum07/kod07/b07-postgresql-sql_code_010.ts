// File: IliskiliKitapEkleme.ts
import { Pool } from "pg";

// Önce yazar kaydı oluşturulur.
// Dönen yazar_id kitap eklemede kullanılır.
// İşlem örneği transaction bölümünde daha güvenli hâle getirilecektir.

const baglantiHavuzu = new Pool({
  connectionString: process.env.VERITABANI_BAGLANTI_METNI,
});

async function yazariVeKitabiEkle(): Promise<void> {
  const yazarSonucu = await baglantiHavuzu.query(
    "INSERT INTO yazarlar (ad_soyad) VALUES ($1) RETURNING yazar_id;",
    ["Adalet Ağaoğlu"]
  );

  const yeniYazarId = yazarSonucu.rows[0].yazar_id;

  await baglantiHavuzu.query(
    "INSERT INTO kitaplar (kitap_adi, yazar_id) VALUES ($1, $2);",
    ["Ölmeye Yatmak", yeniYazarId]
  );

  console.log("Yazar ve kitabı ilişkilendirilerek eklendi.");
  // Çıktı: Yazar ve kitabı ilişkilendirilerek eklendi.
}

yazariVeKitabiEkle().finally(() => baglantiHavuzu.end());
