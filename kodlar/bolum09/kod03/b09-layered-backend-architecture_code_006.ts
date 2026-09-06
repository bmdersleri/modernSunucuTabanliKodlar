// Dosya: OduncAlmaService.typescript
// Service, ödünç alma kurallarını merkezi olarak uygular.
// Repository yalnızca veri erişimi sağlar.
// Çıktı, kural sağlandığında işlem sonucunu gösterir.

interface Kitap {
  kod: string;
  ad: string;
  uygunMu: boolean;
}

interface Ogrenci {
  numara: string;
  mevcutOduncSayisi: number;
}

class KutuphaneService {
  constructor(
    private kitapRepository: KitapRepository,
    private ogrenciRepository: OgrenciRepository,
    private oduncAlmaRepository: OduncAlmaRepository
  ) {}

  oduncAl(istek: OduncAlmaIstegiDTO): string {
    const kitap = this.kitapRepository.kitapBul(istek.kitapKodu);
    const ogrenci = this.ogrenciRepository.ogrenciBul(istek.ogrenciNumarasi);

    if (!kitap) throw new Error("Kitap bulunamadı.");
    if (!ogrenci) throw new Error("Öğrenci bulunamadı.");
    if (!kitap.uygunMu) throw new Error("Kitap şu anda uygun değildir.");
    if (ogrenci.mevcutOduncSayisi >= 3) throw new Error(
      "Öğrenci ödünç alma sınırına ulaştı.");

    this.oduncAlmaRepository.oduncKaydet(ogrenci.numara, kitap.kod);
    return `${kitap.ad} adlı kitap ödünç verildi.`;
  }
}
