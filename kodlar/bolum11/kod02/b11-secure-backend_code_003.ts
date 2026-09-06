// Dosya: BasitValidator.ts
// Bu örnek harici bağımlılık olmadan çalışan bir şema doğrulayıcı gösterir.
// Gerçek projede zod gibi test edilmiş bir kütüphane tercih edilebilir.
// Çıktı, geçerli ve geçersiz kayıt isteklerinin sonucunu gösterir.

interface KayitIstegi {
  kullaniciAdi: string;
  parola: string;
  rol: "ogrenci" | "kutuphaneci";
}

interface DogrulamaSonucu {
  gecerliMi: boolean;
  hatalar: string[];
}

function kayitIstegiDogrula(veri: unknown): DogrulamaSonucu {
  const hatalar: string[] = [];

  if (typeof veri !== "object" || veri === null) {
    return { gecerliMi: false, hatalar: ["İstek gövdesi bir nesne olmalıdır."] };
  }

  const kayit = veri as Record<string, unknown>;

  if (typeof kayit.kullaniciAdi !== "string" || kayit.kullaniciAdi.trim().length < 3) {
    hatalar.push("kullaniciAdi en az 3 karakter uzunluğunda bir metin olmalıdır.");
  }

  if (typeof kayit.parola !== "string" || kayit.parola.length < 8) {
    hatalar.push("parola en az 8 karakter uzunluğunda bir metin olmalıdır.");
  }

  if (kayit.rol !== "ogrenci" && kayit.rol !== "kutuphaneci") {
    hatalar.push("rol yalnızca 'ogrenci' veya 'kutuphaneci' olabilir.");
  }

  return { gecerliMi: hatalar.length === 0, hatalar };
}

console.log(kayitIstegiDogrula({ kullaniciAdi: "elif", parola: "guclu-Parola1",
  rol: "ogrenci" }));
console.log(kayitIstegiDogrula({ kullaniciAdi: "ab", parola: "123", rol: "admin" }));
// Çıktı: { gecerliMi: true, hatalar: [] }
// Çıktı: { gecerliMi: false, hatalar: [ 'kullaniciAdi en az 3 karakter uzunluğunda bir
// metin olmalıdır.', 'parola en az 8 karakter uzunluğunda bir metin olmalıdır.', "rol
// yalnızca 'ogrenci' veya 'kutuphaneci' olabilir." ] }
