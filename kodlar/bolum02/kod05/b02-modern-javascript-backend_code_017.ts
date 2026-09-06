// File: ChapterMiniApp.ts
// Bu mini uygulama modül mantığını, interface'leri ve async hata yönetimini birleştirir.
// Gerçek projede her sınıf ve arayüz ayrı modülde bulunmalıdır.
// Çıktı aktif müşteri için sipariş özetini üretir.

interface Musteri {
  readonly kimlik: number;
  readonly ad: string;
  readonly eposta?: string;
  readonly aktifMi: boolean;
}

interface Siparis {
  readonly siparisNo: string;
  readonly musteriKimlik: number;
  readonly urunler: readonly string[];
}

class KaynakBulunamadiHatasi extends Error {
  constructor(kaynakAdi: string) {
    super(`${kaynakAdi} bulunamadı.`);
    this.name = "KaynakBulunamadiHatasi";
  }
}

class VeriDeposu {
  private readonly musteriListesi: readonly Musteri[] = [
    { kimlik: 1, ad: "Yasemin", eposta: "yasemin@ornek.com", aktifMi: true },
    { kimlik: 2, ad: "Ozan", aktifMi: false }
  ];

  async musteriGetir(kimlik: number): Promise<Musteri> {
    const musteri = this.musteriListesi.find((kayit) => kayit.kimlik === kimlik);

    if (!musteri) {
      throw new KaynakBulunamadiHatasi("Müşteri");
    }

    return musteri;
  }

  async siparisGetir(musteriKimlik: number): Promise<Siparis> {
    return {
      siparisNo: "SIP-2025-01",
      musteriKimlik,
      urunler: ["Java Kitabı", "Not Defteri"]
    };
  }
}

class SiparisServisi {
  constructor(private readonly veriDeposu: VeriDeposu) {}

  async siparisOzetiGetir(musteriKimlik: number): Promise<string> {
    const [musteri, siparis] = await Promise.all([
      this.veriDeposu.musteriGetir(musteriKimlik),
      this.veriDeposu.siparisGetir(musteriKimlik)
    ]);

    if (!musteri.aktifMi) {
      throw new Error("Pasif müşteri için sipariş oluşturulamaz.");
    }

    const {
      ad: musteriAdi,
      eposta = "E-posta bilgisi yok"
    } = musteri;

    const [ilkUrun, ...digerUrunler] = siparis.urunler;
    const urunOzeti = [ilkUrun, ...digerUrunler].join(", ");

    return `${musteriAdi} (${eposta}) için ${siparis.siparisNo}: ${urunOzeti}`;
  }
}

async function main(): Promise<void> {
  const veriDeposu = new VeriDeposu();
  const siparisServisi = new SiparisServisi(veriDeposu);

  try {
    const siparisOzeti = await siparisServisi.siparisOzetiGetir(1);
    console.log(siparisOzeti);
  } catch (hata: unknown) {
    if (hata instanceof KaynakBulunamadiHatasi) {
      console.error(`İstek hatası: ${hata.message}`);
    } else if (hata instanceof Error) {
      console.error(`İşlem hatası: ${hata.message}`);
    } else {
      console.error("Bilinmeyen hata oluştu.");
    }
  } finally {
    console.log("Sipariş isteği tamamlandı.");
  }
}

main();

// Çıktı: Yasemin (yasemin@ornek.com) için SIP-2025-01: Java Kitabı, Not Defteri
// Çıktı: Sipariş isteği tamamlandı.
