// File: SiparisDurumu.ts
// Union yalnızca geçerli sipariş durumlarına izin verir.
// Switch yapısı durumlara göre farklı davranış üretir.
// Varsayılan durum beklenmeyen değerler için koruma sağlar.

type SiparisDurumu =
  | "beklemede"
  | "hazirlaniyor"
  | "kargoda"
  | "teslimEdildi";

function durumMesajiOlustur(siparisDurumu: SiparisDurumu): string {
  switch (siparisDurumu) {
    case "beklemede":
      return "Sipariş onay bekliyor.";
    case "hazirlaniyor":
      return "Sipariş hazırlanıyor.";
    case "kargoda":
      return "Sipariş kargoya verildi.";
    case "teslimEdildi":
      return "Sipariş teslim edildi.";
  }
}

console.log(durumMesajiOlustur("kargoda"));
// Çıktı: Sipariş kargoya verildi.
