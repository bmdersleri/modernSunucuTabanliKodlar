class GeciciAiHatasi extends Error {}
class KaliciAiHatasi extends Error {}

async function aiIsteginiZamanAsimliCagir(
  gercekIstekFn: (sinyal: AbortSignal) => Promise<string>,
  zamanAsimiMs: number = 5000
): Promise<string> {
  const controller = new AbortController();
  const zamanlayici = setTimeout(() => controller.abort(), zamanAsimiMs);
  try {
    return await gercekIstekFn(controller.signal);
  } catch (hata) {
    if ((hata as Error).name === "AbortError") {
      throw new GeciciAiHatasi("AI servisi zaman aşımına uğradı.");
    }
    throw new KaliciAiHatasi("AI servisi kalıcı bir hata döndürdü.");
  } finally {
    clearTimeout(zamanlayici);
  }
}

async function ozetiGuvenliBicimdeAl(
  gercekIstekFn: (sinyal: AbortSignal) => Promise<string>
): Promise<string | null> {
  try {
    return await aiIsteginiZamanAsimliCagir(gercekIstekFn);
  } catch (hata) {
    console.log(`Özet alınamadı, kitap bilgisi özetsiz gösterilecek: ${(hata as Error).message}`);
    return null; // Hata izolasyonu: özet olmadan da kitap sayfası çalışmaya devam eder.
  }
}

const basariliOzet = await ozetiGuvenliBicimdeAl(async () => "Kısa bir özet metni.");
console.log(basariliOzet);

const basarisizOzet = await ozetiGuvenliBicimdeAl(async () => {
  throw Object.assign(new Error("Zaman aşımı"), { name: "AbortError" });
});
console.log(basarisizOzet);
// Çıktı: Kısa bir özet metni.
// Çıktı: Özet alınamadı, kitap bilgisi özetsiz gösterilecek: AI servisi zaman aşımına uğradı.
// Çıktı: null
