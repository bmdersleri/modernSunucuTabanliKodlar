// File: PostgreSqlBaglantisi.typescript
import { Client } from "pg";

// Bağlantı ayarları ortam değişkenlerinden okunmalıdır.
// Bu örnekte yerel geliştirme veritabanı hedeflenmektedir.
// finally bloğu bağlantının her durumda kapanmasını sağlar.

async function kitaplikBaglantisiniDene(): Promise<void> {
  const veritabaniIstemcisi = new Client({
    host: "localhost",
    port: 5432,
    database: "kitaplik",
    user: "postgres",
    password: "guvenli_parola",
  });

  try {
    await veritabaniIstemcisi.connect();

    const sorguSonucu = await veritabaniIstemcisi.query(
      "SELECT current_database() AS veritabani_adi;"
    );

    console.log(`Bağlanılan veritabanı: ${sorguSonucu.rows[0].veritabani_adi}`);
    // Çıktı: Bağlanılan veritabanı: kitaplik
  } finally {
    await veritabaniIstemcisi.end();
  }
}

kitaplikBaglantisiniDene().catch(console.error);
