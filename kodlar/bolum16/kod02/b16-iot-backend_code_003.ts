interface CihazKaydi {
  cihazId: string;
  apiAnahtari: string;
  aktif: boolean;
}

// Gerçek projede bu kayıtlar veritabanında tutulur; burada örnek amaçlı bellek içi
// liste kullanılır.
const kayitliCihazlar: CihazKaydi[] = [
  { cihazId: "esp32-okuma-salonu-01", apiAnahtari: "anahtar-abc-123", aktif: true },
  { cihazId: "esp32-okuma-salonu-02", apiAnahtari: "anahtar-def-456", aktif: false }
];

class CihazDogrulamaHatasi extends Error {
  constructor(public readonly durumKodu: number, message: string) {
    super(message);
  }
}

function cihaziDogrula(cihazId: string, sunulanAnahtar: string): CihazKaydi {
  const cihaz = kayitliCihazlar.find((c) => c.cihazId === cihazId);
  if (!cihaz) {
    throw new CihazDogrulamaHatasi(401, "Cihaz kayıtlı değil.");
  }
  if (!cihaz.aktif) {
    throw new CihazDogrulamaHatasi(403, "Cihaz devre dışı bırakılmış.");
  }
  if (cihaz.apiAnahtari !== sunulanAnahtar) {
    throw new CihazDogrulamaHatasi(401, "API anahtarı geçersiz.");
  }
  return cihaz;
}

try {
  const cihaz = cihaziDogrula("esp32-okuma-salonu-01", "anahtar-abc-123");
  console.log(`Doğrulandı: ${cihaz.cihazId}`);
} catch (hata) {
  console.log((hata as CihazDogrulamaHatasi).durumKodu,
    (hata as CihazDogrulamaHatasi).message);
}

try {
  cihaziDogrula("esp32-okuma-salonu-02", "anahtar-def-456");
} catch (hata) {
  console.log((hata as CihazDogrulamaHatasi).durumKodu,
    (hata as CihazDogrulamaHatasi).message);
}
// Çıktı: Doğrulandı: esp32-okuma-salonu-01
// Çıktı: 403 Cihaz devre dışı bırakılmış.
