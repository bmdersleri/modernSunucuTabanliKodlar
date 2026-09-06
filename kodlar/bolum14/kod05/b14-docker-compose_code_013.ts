// File: ChapterMiniAppDockerCompose.ts
// Bu dosya, konteynerleştirilmiş bir uygulamanın başlangıçta veritabanına
// güvenli biçimde bağlanma mantığını gösterir; Dockerfile ve docker-compose.yml
// bu bölümde ayrı kod örnekleri (code_003, code_009) olarak sunulmuştur.

interface BaglantiSecenekleri {
  host: string;
  port: number;
  veritabaniAdi: string;
}

class VeritabaniBaglantiHatasi extends Error {}

async function saglikliBaglantiKur(
  secenekler: BaglantiSecenekleri,
  gercekBaglanFn: (secenekler: BaglantiSecenekleri) => Promise<void>,
  maksimumDeneme: number = 5,
  bekleMs: number = 500
): Promise<void> {
  for (let deneme = 1; deneme <= maksimumDeneme; deneme++) {
    try {
      await gercekBaglanFn(secenekler);
      console.log(`[${secenekler.host}] Bağlantı ${deneme}. denemede kuruldu.`);
      return;
    } catch {
      if (deneme === maksimumDeneme) {
        throw new VeritabaniBaglantiHatasi(
          `${maksimumDeneme} denemede veritabanına bağlanılamadı: ${secenekler.host}`
        );
      }
      await new Promise((cozBekle) => setTimeout(cozBekle, bekleMs));
    }
  }
}

// Docker Compose ortamında bu değerler, servis adı ve environment değişkenlerinden gelir.
const composeOrtamSecenekleri: BaglantiSecenekleri = {
  host: "kutuphane-db",
  port: 5432,
  veritabaniAdi: "kutuphane"
};

// Test amaçlı sahte bağlanma fonksiyonu: ilk iki denemede başarısız, üçüncüde başarılı
// olur.
let denemeSayaci = 0;
async function sahteBaglanFn(): Promise<void> {
  denemeSayaci++;
  if (denemeSayaci < 3) {
    throw new Error("Veritabanı henüz hazır değil.");
  }
}

await saglikliBaglantiKur(composeOrtamSecenekleri, sahteBaglanFn);
// Çıktı: [kutuphane-db] Bağlantı 3. denemede kuruldu.
