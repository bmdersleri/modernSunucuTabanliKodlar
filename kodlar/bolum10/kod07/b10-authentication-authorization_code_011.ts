// Dosya: DurumKoduAyrimi.typescript
// Bu örnek 401 ve 403 durumlarının hangi koşulda üretildiğini ayırt eder.
// Çıktı, token yokluğunda 401, yetersiz rolde 403 üretildiğini gösterir.

type Rol = "ogrenci" | "kutuphaneci";

interface Yanit {
  durumKodu: number;
  mesaj: string;
}

function istegiIsle(token: string | null, kullaniciRolu: Rol | null): Yanit {
  if (!token) {
    return { durumKodu: 401, mesaj: "Kimlik doğrulanamadı: token eksik." };
  }

  if (!kullaniciRolu) {
    return { durumKodu: 401, mesaj: "Kimlik doğrulanamadı: token geçersiz." };
  }

  if (kullaniciRolu !== "kutuphaneci") {
    return { durumKodu: 403,
      mesaj: "Bu işlem yalnızca kütüphaneciler tarafından yapılabilir." };
  }

  return { durumKodu: 200, mesaj: "Kitap başarıyla eklendi." };
}

console.log(istegiIsle(null, null));
console.log(istegiIsle("gecerli-token", "ogrenci"));
console.log(istegiIsle("gecerli-token", "kutuphaneci"));
// Çıktı: { durumKodu: 401, mesaj: 'Kimlik doğrulanamadı: token eksik.' }
// Çıktı: { durumKodu: 403, mesaj: 'Bu işlem yalnızca kütüphaneciler tarafından
// yapılabilir.' }
// Çıktı: { durumKodu: 200, mesaj: 'Kitap başarıyla eklendi.' }
