// File: ChapterMiniApp.ts
// Bu mini uygulama güvenli kitap siparişi akışını gösterir.
// Interface, union, generic ve strict kontrol birlikte kullanılır.
// Gerçek projede bu sınıf bir HTTP denetleyicisi tarafından çağrılabilir.

interface Kitap {
  kimlik: number;
  ad: string;
  stokAdedi: number;
}

interface Siparis {
  kimlik: number;
  kitapKimligi: number;
  adet: number;
  durum: SiparisDurumu;
}

type SiparisDurumu = "beklemede" | "hazirlaniyor" | "kargoda";

type ServisSonucu<T> =
  | { basarili: true; mesaj: string; veri: T }
  | { basarili: false; mesaj: string };

class SiparisServisi {
  private kitapListesi: Kitap[] = [
    { kimlik: 1, ad: "TypeScript Başlangıç", stokAdedi: 4 },
    { kimlik: 2, ad: "Backend Tasarımı", stokAdedi: 0 }
  ];

  private sonrakiSiparisKimligi = 1;

  public siparisOlustur(
    kitapKimligi: number,
    adet: number
  ): ServisSonucu<Siparis> {
    const kitap = this.kitapListesi.find(
      (mevcutKitap) => mevcutKitap.kimlik === kitapKimligi
    );

    if (kitap === undefined) {
      return { basarili: false, mesaj: "Kitap bulunamadı." };
    }

    if (adet <= 0) {
      return { basarili: false, mesaj: "Sipariş adedi sıfırdan büyük olmalıdır." };
    }

    if (kitap.stokAdedi < adet) {
      return { basarili: false, mesaj: "Yeterli stok yok." };
    }

    kitap.stokAdedi -= adet;

    const yeniSiparis: Siparis = {
      kimlik: this.sonrakiSiparisKimligi++,
      kitapKimligi,
      adet,
      durum: "hazirlaniyor"
    };

    return {
      basarili: true,
      mesaj: "Sipariş başarıyla oluşturuldu.",
      veri: yeniSiparis
    };
  }
}

function main(): void {
  const siparisServisi = new SiparisServisi();
  const siparisSonucu = siparisServisi.siparisOlustur(1, 2);

  if (siparisSonucu.basarili) {
    console.log(`${siparisSonucu.mesaj} Sipariş: ${siparisSonucu.veri.kimlik}`);
    console.log(`Durum: ${siparisSonucu.veri.durum}`);
  } else {
    console.log(`Hata: ${siparisSonucu.mesaj}`);
  }
}

main();
// Çıktı: Sipariş başarıyla oluşturuldu. Sipariş: 1
// Çıktı: Durum: hazirlaniyor
