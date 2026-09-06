// File: ChapterMiniApp.ts
// Bu uygulama kütüphane ödünç alma isteğini uçtan uca işler.
// Controller HTTP benzeri yanıt üretir, service kuralları uygular.
// Repository bellek içi veri kaynağını temsil eder.

interface OduncAlmaIstegiDTO {
  ogrenciNumarasi: string;
  kitapKodu: string;
}

interface Kitap {
  kod: string;
  ad: string;
  uygunMu: boolean;
}

interface Ogrenci {
  numara: string;
  mevcutOduncSayisi: number;
}

class KitapRepository {
  private kitapListesi: Kitap[] = [
    { kod: "JAVA-101", ad: "Java ile Programlama", uygunMu: true }
  ];

  kitapBul(kitapKodu: string): Kitap | undefined {
    return this.kitapListesi.find((kitap) => kitap.kod === kitapKodu);
  }

  kitabiOduncteIsaretle(kitapKodu: string): void {
    const kitap = this.kitapBul(kitapKodu);
    if (kitap) kitap.uygunMu = false;
  }
}

class OgrenciRepository {
  private ogrenciListesi: Ogrenci[] = [{ numara: "2024001", mevcutOduncSayisi: 0 }];

  ogrenciBul(ogrenciNumarasi: string): Ogrenci | undefined {
    return this.ogrenciListesi.find((ogrenci) => ogrenci.numara === ogrenciNumarasi);
  }

  oduncSayisiniArtir(ogrenciNumarasi: string): void {
    const ogrenci = this.ogrenciBul(ogrenciNumarasi);
    if (ogrenci) ogrenci.mevcutOduncSayisi++;
  }
}

class OduncAlmaService {
  constructor(
    private kitapRepository: KitapRepository,
    private ogrenciRepository: OgrenciRepository
  ) {}

  oduncAl(istek: OduncAlmaIstegiDTO): string {
    const kitap = this.kitapRepository.kitapBul(istek.kitapKodu);
    const ogrenci = this.ogrenciRepository.ogrenciBul(istek.ogrenciNumarasi);

    if (!kitap) throw new Error("Kitap bulunamadı.");
    if (!ogrenci) throw new Error("Öğrenci bulunamadı.");
    if (!kitap.uygunMu) throw new Error("Kitap uygun değildir.");
    if (ogrenci.mevcutOduncSayisi >= 3) throw new Error("Öğrenci limitine ulaştı.");

    this.kitapRepository.kitabiOduncteIsaretle(kitap.kod);
    this.ogrenciRepository.oduncSayisiniArtir(ogrenci.numara);
    return `${kitap.ad} başarıyla ödünç verildi.`;
  }
}

class OduncAlmaController {
  constructor(private oduncAlmaService: OduncAlmaService) {}

  istekKarsila(istek: OduncAlmaIstegiDTO): { durumKodu: number; mesaj: string } {
    if (!istek.ogrenciNumarasi || !istek.kitapKodu) {
      return { durumKodu: 400, mesaj: "Zorunlu alanlar eksiktir." };
    }

    try {
      return { durumKodu: 201, mesaj: this.oduncAlmaService.oduncAl(istek) };
    } catch (hata) {
      return { durumKodu: 400, mesaj: (hata as Error).message };
    }
  }
}

const kitapRepository = new KitapRepository();
const ogrenciRepository = new OgrenciRepository();
const oduncAlmaService = new OduncAlmaService(kitapRepository, ogrenciRepository);
const oduncAlmaController = new OduncAlmaController(oduncAlmaService);

console.log(oduncAlmaController.istekKarsila({
  ogrenciNumarasi: "2024001",
  kitapKodu: "JAVA-101"
}));
// Çıktı: { durumKodu: 201, mesaj: 'Java ile Programlama başarıyla ödünç verildi.' }
