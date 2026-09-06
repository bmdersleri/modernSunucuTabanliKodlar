// File: OduncTransaction.ts
import { Pool } from "pg";

// Transaction için havuzdan tek bir istemci alınır.
// Başarısızlıkta ROLLBACK çalıştırılmalıdır.
// COMMIT yalnızca tüm adımlar başarılıysa çağrılır.

const baglantiHavuzu = new Pool({
  connectionString: process.env.VERITABANI_BAGLANTI_METNI,
});

async function kitapOduncVer(uyeId: number, kitapId: number): Promise<void> {
  const veritabaniIstemcisi = await baglantiHavuzu.connect();

  try {
    await veritabaniIstemcisi.query("BEGIN;");

    const kitapSonucu = await veritabaniIstemcisi.query(
      `UPDATE kitaplar
       SET odunc_durumu = true
       WHERE kitap_id = $1 AND odunc_durumu = false
       RETURNING kitap_id;`,
      [kitapId]
    );

    if (kitapSonucu.rowCount !== 1) {
      throw new Error("Kitap ödünç verilemez.");
    }

    await veritabaniIstemcisi.query(
      "INSERT INTO odunc_islemleri (uye_id, kitap_id) VALUES ($1, $2);",
      [uyeId, kitapId]
    );

    await veritabaniIstemcisi.query("COMMIT;");
    console.log("Ödünç verme işlemi tamamlandı.");
    // Çıktı: Ödünç verme işlemi tamamlandı.
  } catch (hata) {
    await veritabaniIstemcisi.query("ROLLBACK;");
    console.error(`İşlem geri alındı: ${(hata as Error).message}`);
  } finally {
    veritabaniIstemcisi.release();
    await baglantiHavuzu.end();
  }
}

kitapOduncVer(1, 1);
