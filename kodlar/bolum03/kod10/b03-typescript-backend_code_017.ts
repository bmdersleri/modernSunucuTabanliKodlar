// File: GenericApiSonucu.typescript
// T parametresi yanıtın taşıdığı veri türünü temsil eder.
// Aynı sonuç yapısı farklı backend modelleri için kullanılır.
// Hata durumunda veri alanı isteğe bağlıdır.

interface ApiSonucu<T> {
  basarili: boolean;
  mesaj: string;
  veri?: T;
}

interface Kitap {
  kimlik: number;
  ad: string;
}

function basariliSonucOlustur<T>(veri: T, mesaj: string): ApiSonucu<T> {
  return { basarili: true, mesaj, veri };
}

const kitapSonucu = basariliSonucOlustur<Kitap>(
  { kimlik: 3, ad: "Node.js Tasarımı" },
  "Kitap bulundu."
);

console.log(kitapSonucu.veri?.ad);
// Çıktı: Node.js Tasarımı
