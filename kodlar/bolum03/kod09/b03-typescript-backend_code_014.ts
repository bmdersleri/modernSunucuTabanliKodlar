// File: AyrikUnionSonuc.typescript
// Başarılı ve hatalı yanıtların alanları farklıdır.
// basarili alanı tipi güvenle daraltmak için kullanılır.
// Her dal yalnızca kendi alanlarına erişir.

type KayitSonucu =
  | { basarili: true; kullaniciKimligi: number }
  | { basarili: false; hataMesaji: string };

function kayitMesajiniOlustur(sonuc: KayitSonucu): string {
  if (sonuc.basarili) {
    return `Kullanıcı oluşturuldu: ${sonuc.kullaniciKimligi}`;
  }

  return `Kayıt başarısız: ${sonuc.hataMesaji}`;
}

console.log(kayitMesajiniOlustur({ basarili: true, kullaniciKimligi: 42 }));
// Çıktı: Kullanıcı oluşturuldu: 42
