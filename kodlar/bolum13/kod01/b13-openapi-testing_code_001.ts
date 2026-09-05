// Dosya: BelgeVeTestAkisiGiris.typescript
// Bu örnek bir endpoint'in yaşam döngüsünde belgeleme ve testin yerini gösterir.
// Gerçek projede bu adımlar ayrı dosyalarda (route, openapi.ts, *.test.ts) yaşar.

type Adim = "endpointYaz" | "openApiBelgele" | "unitTestYaz" | "integrationTestYaz" | "kaliteKapisi";

const gelistirmeSirasi: Adim[] = [
  "endpointYaz",
  "openApiBelgele",
  "unitTestYaz",
  "integrationTestYaz",
  "kaliteKapisi"
];

for (const adim of gelistirmeSirasi) {
  console.log(`Adım: ${adim}`);
}
// Çıktı: Adım: endpointYaz
// Çıktı: Adım: openApiBelgele
// Çıktı: Adım: unitTestYaz
// Çıktı: Adım: integrationTestYaz
// Çıktı: Adım: kaliteKapisi
