// File: BelirsizTip.ts
// Boş dizi başlangıçta yeterli bilgi sağlamaz.
// Açık tip, dizinin veri sözleşmesini kurar.
// Kullanıcı listesi yalnızca Kullanici nesneleri taşımalıdır.

interface Kullanici {
  kimlik: number;
  ad: string;
}

const kullaniciListesi: Kullanici[] = [];
kullaniciListesi.push({ kimlik: 1, ad: "Mert" });

console.log(kullaniciListesi[0].ad);
// Çıktı: Mert
