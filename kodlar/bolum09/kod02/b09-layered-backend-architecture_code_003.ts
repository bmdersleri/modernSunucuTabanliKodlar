// Dosya: OduncAlmaController.typescript
// Controller, dış girdiyi DTO biçiminde alır.
// İş kuralını service katmanına devreder.
// HTTP çerçevesi yerine basit nesneler kullanılmıştır.

interface HttpYanit {
  durumKodu: number;
  govde: { mesaj: string };
}

class OduncAlmaController {
  constructor(private oduncAlmaService: OduncAlmaService) {}

  oduncAl(istekGovdesi: OduncAlmaIstegiDTO): HttpYanit {
    if (!istekGovdesi.ogrenciNumarasi || !istekGovdesi.kitapKodu) {
      return { durumKodu: 400,
        govde: { mesaj: "Öğrenci numarası ve kitap kodu zorunludur." } };
    }

    try {
      const mesaj = this.oduncAlmaService.oduncAl(istekGovdesi);
      return { durumKodu: 201, govde: { mesaj } };
    } catch (hata) {
      return { durumKodu: 400, govde: { mesaj: (hata as Error).message } };
    }
  }
}
