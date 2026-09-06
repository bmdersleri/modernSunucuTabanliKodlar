// Dosya: AuthAkisiGiris.ts
// Bu örnek authentication ve authorization adımlarının sırasını gösterir.
// Gerçek projede bu adımlar middleware fonksiyonlarına ayrılmalıdır.
// Çıktı, kimliği doğrulanmış ama yetkisiz bir isteğin reddedildiğini gösterir.

interface Kullanici {
  kullaniciAdi: string;
  rol: "ogrenci" | "kutuphaneci";
}

function kimlikDogrula(tokenGecerliMi: boolean, kullanici: Kullanici | null): Kullanici {
  if (!tokenGecerliMi || !kullanici) {
    throw new Error("401: Kimlik doğrulanamadı.");
  }
  return kullanici;
}

function yetkilendir(kullanici: Kullanici, gerekliRol: Kullanici["rol"]): void {
  if (kullanici.rol !== gerekliRol) {
    throw new Error("403: Bu işlem için yetkiniz yok.");
  }
}

const ogrenci: Kullanici = { kullaniciAdi: "elif", rol: "ogrenci" };

try {
  const dogrulanmisKullanici = kimlikDogrula(true, ogrenci);
  yetkilendir(dogrulanmisKullanici, "kutuphaneci");
  console.log("İşlem gerçekleştirildi.");
} catch (hata) {
  console.log((hata as Error).message);
}
// Çıktı: 403: Bu işlem için yetkiniz yok.
