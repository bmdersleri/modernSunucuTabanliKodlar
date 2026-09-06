// File: ChapterMiniAppAiIntegration.ts
// Bu dosya, bir kitap özeti isteğinin uçtan uca güvenli işlenişini tek bir yerde gösterir.

interface OzetYaniti {
  ozet: string;
}

function ozetYanitiniDogrula(veri: unknown): veri is OzetYaniti {
  if (typeof veri !== "object" || veri === null) {
    return false;
  }
  const aday = veri as Record<string, unknown>;
  return typeof aday.ozet === "string" && aday.ozet.trim().length > 0;
}

class GeciciAiHatasi extends Error {}

async function zamanAsimliOzetIste(
  gercekIstekFn: (sinyal: AbortSignal) => Promise<unknown>,
  zamanAsimiMs: number = 5000
): Promise<unknown> {
  const controller = new AbortController();
  const zamanlayici = setTimeout(() => controller.abort(), zamanAsimiMs);
  try {
    return await gercekIstekFn(controller.signal);
  } catch (hata) {
    if ((hata as Error).name === "AbortError") {
      throw new GeciciAiHatasi("AI servisi zaman aşımına uğradı.");
    }
    throw hata;
  } finally {
    clearTimeout(zamanlayici);
  }
}

async function kitapOzetiniGuvenliGetir(
  gercekIstekFn: (sinyal: AbortSignal) => Promise<unknown>
): Promise<string | null> {
  let hamYanit: unknown;
  try {
    hamYanit = await zamanAsimliOzetIste(gercekIstekFn);
  } catch (hata) {
    console.log(`Özet alınamadı: ${(hata as Error).message}`);
    return null;
  }

  if (!ozetYanitiniDogrula(hamYanit)) {
    console.log("AI servisi geçersiz/boş özet döndürdü, özet gösterilmeyecek.");
    return null;
  }

  return hamYanit.ozet;
}

const basariliOzet = await kitapOzetiniGuvenliGetir(
  async () => ({ ozet: "Kısa ve öz bir özet." }));
console.log(basariliOzet);

const bosOzet = await kitapOzetiniGuvenliGetir(async () => ({ ozet: "" }));
console.log(bosOzet);

const zamanAsimi = await kitapOzetiniGuvenliGetir(async () => {
  throw Object.assign(new Error("iptal"), { name: "AbortError" });
});
console.log(zamanAsimi);
// Çıktı: Kısa ve öz bir özet.
// Çıktı: AI servisi geçersiz/boş özet döndürdü, özet gösterilmeyecek.
// Çıktı: null
// Çıktı: Özet alınamadı: AI servisi zaman aşımına uğradı.
// Çıktı: null
