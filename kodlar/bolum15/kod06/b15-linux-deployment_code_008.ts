interface ProductionOrtamDegiskenleri {
  DATABASE_URL: string;
  JWT_GIZLI_ANAHTAR: string;
  NODE_ENV: string;
}

function zorunluOrtamDegiskenleriniYukle(
  ortam: Record<string, string | undefined>
): ProductionOrtamDegiskenleri {
  const zorunluAnahtarlar: (keyof ProductionOrtamDegiskenleri)[] = [
    "DATABASE_URL",
    "JWT_GIZLI_ANAHTAR",
    "NODE_ENV"
  ];
  const eksikler = zorunluAnahtarlar.filter((anahtar) => !ortam[anahtar]);
  if (eksikler.length > 0) {
    throw new Error(`Eksik ortam değişkenleri: ${eksikler.join(", ")}`);
  }
  return {
    DATABASE_URL: ortam.DATABASE_URL!,
    JWT_GIZLI_ANAHTAR: ortam.JWT_GIZLI_ANAHTAR!,
    NODE_ENV: ortam.NODE_ENV!
  };
}

interface SaglikDurumu {
  durum: "ayakta" | "sorunlu";
  veritabaniBagli: boolean;
  zaman: string;
}

async function saglikKontroluYap(
  veritabaniPingFn: () => Promise<boolean>): Promise<SaglikDurumu> {
  const veritabaniBagli = await veritabaniPingFn().catch(() => false);
  return {
    durum: veritabaniBagli ? "ayakta" : "sorunlu",
    veritabaniBagli,
    zaman: new Date().toISOString()
  };
}

const sahteOrtam = {
  DATABASE_URL: "postgresql://postgres:parola@kutuphane-db:5432/kutuphane",
  JWT_GIZLI_ANAHTAR: "gizli-anahtar-degeri",
  NODE_ENV: "production"
};
const ayarlar = zorunluOrtamDegiskenleriniYukle(sahteOrtam);
console.log(ayarlar.NODE_ENV);

const durum = await saglikKontroluYap(async () => true);
console.log(durum.durum);
// Çıktı: production
// Çıktı: ayakta
