// Dosya: AuthMiddleware.ts
// Bu örnek Express benzeri bir middleware imzası kullanır.
// req, res ve next parametreleri gerçek projede Express tiplerinden gelir.
// Middleware yalnızca kimliği doğrular; iş kuralı içermez.

interface KimlikliIstek {
  headers: { authorization?: string };
  kullanici?: { kullaniciAdi: string; rol: "ogrenci" | "kutuphaneci" };
}

interface BasitYanit {
  durumKodu: number;
  gonderilenMesaj?: string;
  durum(kod: number): BasitYanit;
  json(veri: unknown): void;
}

function authMiddleware(
  istek: KimlikliIstek,
  yanit: BasitYanit,
  next: () => void
): void {
  const baslik = istek.headers.authorization;

  if (!baslik || !baslik.startsWith("Bearer ")) {
    yanit.durum(401).json({ mesaj: "Token bulunamadı." });
    return;
  }

  const token = baslik.replace("Bearer ", "");

  try {
    istek.kullanici = tokenDogrulaVeKullaniciDondur(token);
    next();
  } catch {
    yanit.durum(401).json({ mesaj: "Token geçersiz veya süresi dolmuş." });
  }
}

function tokenDogrulaVeKullaniciDondur(
  token: string
): { kullaniciAdi: string; rol: "ogrenci" | "kutuphaneci" } {
  if (token !== "gecerli-token") {
    throw new Error("Geçersiz token.");
  }
  return { kullaniciAdi: "elif", rol: "ogrenci" };
}
