// File: GuvenliKullaniciArama.typescript
// find işlemi kayıt bulunamadığında undefined döndürür.
// Strict mode bu olasılığın ele alınmasını ister.
// Erken dönüş kodun okunabilirliğini artırır.

interface Kullanici {
  kimlik: number;
  ad: string;
}

function kullaniciBul(kullaniciListesi: Kullanici[], aranacakKimlik: number): Kullanici | undefined {
  return kullaniciListesi.find((kullanici) => kullanici.kimlik === aranacakKimlik);
}

const kullanicilar: Kullanici[] = [{ kimlik: 1, ad: "Buse" }];
const bulunanKullanici = kullaniciBul(kullanicilar, 2);

if (bulunanKullanici === undefined) {
  console.log("Kullanıcı bulunamadı.");
} else {
  console.log(bulunanKullanici.ad);
}
// Çıktı: Kullanıcı bulunamadı.
