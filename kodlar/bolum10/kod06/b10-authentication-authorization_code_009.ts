// Dosya: RbacGuard.typescript
// requireRole, izin verilen rollerin listesini alır ve bir kontrol fonksiyonu döndürür.
// Bu desen, aynı guard'ın farklı endpoint'lerde farklı rollerle yeniden kullanılmasını
// sağlar.
// Çıktı, kütüphaneciye izin verilirken öğrencinin reddedildiğini gösterir.

type Rol = "ogrenci" | "kutuphaneci";

interface DogrulanmisKullanici {
  kullaniciAdi: string;
  rol: Rol;
}

function requireRole(izinVerilenRoller: Rol[]) {
  return function (kullanici: DogrulanmisKullanici): void {
    if (!izinVerilenRoller.includes(kullanici.rol)) {
      throw new Error(`403: '${kullanici.rol}' rolü bu işlem için yetkili değil.`);
    }
  };
}

const sadeceKutuphaneci = requireRole(["kutuphaneci"]);

const kutuphaneci: DogrulanmisKullanici = { kullaniciAdi: "yasemin", rol: "kutuphaneci" };
const ogrenci: DogrulanmisKullanici = { kullaniciAdi: "elif", rol: "ogrenci" };

try {
  sadeceKutuphaneci(kutuphaneci);
  console.log("Kitap ekleme işlemi gerçekleştirildi.");
} catch (hata) {
  console.log((hata as Error).message);
}

try {
  sadeceKutuphaneci(ogrenci);
  console.log("Kitap ekleme işlemi gerçekleştirildi.");
} catch (hata) {
  console.log((hata as Error).message);
}
// Çıktı: Kitap ekleme işlemi gerçekleştirildi.
// Çıktı: 403: 'ogrenci' rolü bu işlem için yetkili değil.
