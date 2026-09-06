// Dosya: GuvenlikKatmanlariGiris.typescript
// Bu örnek bir isteğin geçtiği katman sırasını gösterir.
// Gerçek projede her katman ayrı bir middleware fonksiyonuna karşılık gelir.
// Çıktı, bir katmanın reddettiği isteğin sonraki katmana ulaşmadığını gösterir.

type Katman = "cors" | "rateLimit" | "validation" | "authentication" | "authorization" | "route";

function katmandanGecir(istek: { katmanlar: Katman[] }, mevcutKatman: Katman): boolean {
  return istek.katmanlar.includes(mevcutKatman);
}

const gelenIstek = { katmanlar: ["cors", "rateLimit", "validation"] as Katman[] };

const sira: Katman[] = ["cors", "rateLimit", "validation", "authentication",
  "authorization", "route"];

for (const katman of sira) {
  if (!katmandanGecir(gelenIstek, katman)) {
    console.log(`İstek '${katman}' katmanında reddedildi veya bu katmana ulaşmadı.`);
    break;
  }
  console.log(`'${katman}' katmanından geçti.`);
}
// Çıktı: 'cors' katmanından geçti.
// Çıktı: 'rateLimit' katmanından geçti.
// Çıktı: 'validation' katmanından geçti.
// Çıktı: İstek 'authentication' katmanında reddedildi veya bu katmana ulaşmadı.
