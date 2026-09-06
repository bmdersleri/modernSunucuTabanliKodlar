// Dosya: SecretYukleyici.typescript
// zorunluSecretlariYukle, process.env üzerinden okur ve eksik alanları erken tespit eder.
// Gerçek projede .env dosyası yalnızca geliştirmede kullanılır ve git deposuna eklenmez.
// Çıktı, eksik bir secret olduğunda uygulamanın erken ve anlaşılır biçimde durduğunu
// gösterir.

interface UygulamaSecretleri {
  jwtGizliAnahtari: string;
  veritabaniBaglantisi: string;
}

function zorunluSecretlariYukle(ortam: Record<string,
  string | undefined>): UygulamaSecretleri {
  const eksikler: string[] = [];

  if (!ortam.JWT_SECRET) eksikler.push("JWT_SECRET");
  if (!ortam.DATABASE_URL) eksikler.push("DATABASE_URL");

  if (eksikler.length > 0) {
    throw new Error(
      `Uygulama başlatılamadı: eksik ortam değişkenleri -> ${eksikler.join(", ")}`
    );
  }

  return {
    jwtGizliAnahtari: ortam.JWT_SECRET as string,
    veritabaniBaglantisi: ortam.DATABASE_URL as string
  };
}

try {
  zorunluSecretlariYukle({ JWT_SECRET: undefined,
    DATABASE_URL: "postgresql://localhost/kutuphane" });
} catch (hata) {
  console.log((hata as Error).message);
}

const gecerliOrtam = { JWT_SECRET: "uretim-sirri",
  DATABASE_URL: "postgresql://localhost/kutuphane" };
console.log(zorunluSecretlariYukle(gecerliOrtam));
// Çıktı: Uygulama başlatılamadı: eksik ortam değişkenleri -> JWT_SECRET
// Çıktı: { jwtGizliAnahtari: 'uretim-sirri', veritabaniBaglantisi:
// 'postgresql://localhost/kutuphane' }
