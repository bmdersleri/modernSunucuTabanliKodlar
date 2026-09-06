// Dosya: RetryStratejisi.ts
// yenidenDeneyerekCalistir, yalnızca geriDenenebilirMi true dönen hatalarda tekrar dener.
// Bekleme süresi her denemede iki katına çıkar (üstel geri çekilme).
// Çıktı, iki başarısız denemeden sonra üçüncü denemenin başarılı olduğunu gösterir.

class GeciciHata extends Error {}
class KaliciHata extends Error {}

function bekle(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function yenidenDeneyerekCalistir<T>(
  islem: () => Promise<T>,
  azamiDeneme = 3,
  baslangicBeklemeMs = 100
): Promise<T> {
  let sonHata: unknown;

  for (let deneme = 1; deneme <= azamiDeneme; deneme++) {
    try {
      return await islem();
    } catch (hata) {
      sonHata = hata;

      if (!(hata instanceof GeciciHata) || deneme === azamiDeneme) {
        throw hata;
      }

      const beklemeSuresi = baslangicBeklemeMs * 2 ** (deneme - 1);
      console.log(
        `Deneme ${deneme} başarısız, ${beklemeSuresi} ms sonra tekrar denenecek.`);
      await bekle(beklemeSuresi);
    }
  }

  throw sonHata;
}

let denemeSayaci = 0;

async function kararsizIslem(): Promise<string> {
  denemeSayaci += 1;
  if (denemeSayaci < 3) {
    throw new GeciciHata(`Deneme ${denemeSayaci}: geçici ağ hatası.`);
  }
  return "Harici servisten veri alındı.";
}

console.log(await yenidenDeneyerekCalistir(kararsizIslem, 3, 50));
// Çıktı: Deneme 1 başarısız, 50 ms sonra tekrar denenecek.
// Çıktı: Deneme 2 başarısız, 100 ms sonra tekrar denenecek.
// Çıktı: Harici servisten veri alındı.
