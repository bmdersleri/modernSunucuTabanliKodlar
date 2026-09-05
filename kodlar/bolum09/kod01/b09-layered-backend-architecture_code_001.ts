// Dosya: KatmanliYapiGiris.typescript
// Bu örnek katmanların temel görev dağılımını gösterir.
// Gerçek projede sınıflar ayrı dosyalara taşınmalıdır.
// Çıktı, başarılı bir ödünç alma işlemini gösterir.

interface OduncAlmaIstegiDTO {
  ogrenciNumarasi: string;
  kitapKodu: string;
}

class OduncAlmaRepository {
  oduncKaydet(ogrenciNumarasi: string, kitapKodu: string): void {
    console.log(`Kayıt oluşturuldu: ${ogrenciNumarasi} - ${kitapKodu}`);
  }
}

class OduncAlmaService {
  constructor(private oduncAlmaRepository: OduncAlmaRepository) {}

  oduncAl(istek: OduncAlmaIstegiDTO): string {
    this.oduncAlmaRepository.oduncKaydet(istek.ogrenciNumarasi, istek.kitapKodu);
    return "Kitap başarıyla ödünç verildi.";
  }
}

class OduncAlmaController {
  constructor(private oduncAlmaService: OduncAlmaService) {}

  istekKarsila(istek: OduncAlmaIstegiDTO): void {
    const mesaj = this.oduncAlmaService.oduncAl(istek);
    console.log(mesaj);
  }
}

const repository = new OduncAlmaRepository();
const service = new OduncAlmaService(repository);
const controller = new OduncAlmaController(service);

controller.istekKarsila({ ogrenciNumarasi: "2024001", kitapKodu: "JAVA-101" });
// Çıktı: Kayıt oluşturuldu: 2024001 - JAVA-101
// Çıktı: Kitap başarıyla ödünç verildi.
