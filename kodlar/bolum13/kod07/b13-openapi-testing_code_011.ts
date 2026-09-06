// Dosya: EmailServiceMock.ts
// KaydediciMockEmailService, gerçek gönderim yapmadan tüm çağrıları bir listede tutar.
// Bu desen, herhangi bir test çerçevesi olmadan da uygulanabilir.
// Çıktı, servisin doğru alıcı ve konu ile bir kez çağrıldığını gösterir.

interface EmailService {
  gonder(aliciEposta: string, konu: string, govde: string): Promise<boolean>;
}

interface KaydedilenCagri {
  aliciEposta: string;
  konu: string;
  govde: string;
}

class KaydediciMockEmailService implements EmailService {
  readonly cagrilar: KaydedilenCagri[] = [];

  async gonder(aliciEposta: string, konu: string, govde: string): Promise<boolean> {
    this.cagrilar.push({ aliciEposta, konu, govde });
    return true;
  }
}

async function sonTeslimHatirlatmasiGonder(emailService: EmailService,
  ogrenciEposta: string, kitapAdi: string): Promise<void> {
  await emailService.gonder(ogrenciEposta, `Son teslim tarihi yaklaşıyor: ${kitapAdi}`,
    "Detaylar için sisteme giriş yapınız.");
}

async function calistir(): Promise<void> {
  const mockEmailService = new KaydediciMockEmailService();

  await sonTeslimHatirlatmasiGonder(mockEmailService, "elif@ogrenci.mehmetakif.edu.tr",
    "Java ile Programlama");

  console.log(mockEmailService.cagrilar.length === 1);
  console.log(mockEmailService.cagrilar[0].aliciEposta);
  console.log(mockEmailService.cagrilar[0].konu);
}

await calistir();
// Çıktı: true
// Çıktı: elif@ogrenci.mehmetakif.edu.tr
// Çıktı: Son teslim tarihi yaklaşıyor: Java ile Programlama
