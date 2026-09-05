// File: ChapterMiniAppLinuxDeployment.typescript
// Bu dosya, production'a hazır bir başlangıç akışını tek yerde gösterir;
// Nginx ve HTTPS yapılandırması bu bölümde ayrı kod örnekleri (code_003, code_006) olarak sunulmuştur.

interface ProductionAyarlari {
  databaseUrl: string;
  jwtGizliAnahtar: string;
}

function ortamiDogrula(ortam: Record<string, string | undefined>): ProductionAyarlari {
  const eksikler = ["DATABASE_URL", "JWT_GIZLI_ANAHTAR"].filter((anahtar) => !ortam[anahtar]);
  if (eksikler.length > 0) {
    throw new Error(`Eksik ortam değişkenleri: ${eksikler.join(", ")}`);
  }
  return {
    databaseUrl: ortam.DATABASE_URL!,
    jwtGizliAnahtar: ortam.JWT_GIZLI_ANAHTAR!
  };
}

function guvenliLoglaHata(baglam: string, hata: unknown, hassasAlanlar: string[]): void {
  const mesaj = hata instanceof Error ? hata.message : String(hata);
  console.error(`[${baglam}] Hata: ${mesaj}`);
  if (hassasAlanlar.length > 0) {
    console.error(`[${baglam}] Not: ${hassasAlanlar.join(", ")} alanları loglanmadı.`);
  }
}

interface SaglikRaporu {
  durum: "ayakta" | "sorunlu";
  veritabani: boolean;
}

async function tamSaglikKontrolu(veritabaniPingFn: () => Promise<boolean>): Promise<SaglikRaporu> {
  try {
    const veritabani = await veritabaniPingFn();
    return { durum: veritabani ? "ayakta" : "sorunlu", veritabani };
  } catch (hata) {
    guvenliLoglaHata("saglikKontrolu", hata, ["baglantiDetayi"]);
    return { durum: "sorunlu", veritabani: false };
  }
}

const ayarlar = ortamiDogrula({
  DATABASE_URL: "postgresql://postgres:parola@kutuphane-db:5432/kutuphane",
  JWT_GIZLI_ANAHTAR: "gizli-anahtar-degeri"
});
console.log(Boolean(ayarlar.databaseUrl));

const raporBasarili = await tamSaglikKontrolu(async () => true);
console.log(raporBasarili.durum);

const raporBasarisiz = await tamSaglikKontrolu(async () => {
  throw new Error("Bağlantı zaman aşımına uğradı.");
});
console.log(raporBasarisiz.durum);
// Çıktı: true
// Çıktı: ayakta
// Çıktı: sorunlu
