// Dosya: EpostaBildirimAkisi.typescript
// EmailService arayüzü, gerçek SMTP entegrasyonunu servisin kullanımından soyutlar.
// SahteEmailService, test ve örnekleme amacıyla gerçek gönderim yapmadan sonuç üretir.
// Çıktı, e-posta gönderiminin başarısız olduğu durumda ana işlemin yine de tamamlandığını gösterir.

interface EmailService {
  gonder(aliciEposta: string, konu: string, govde: string): Promise<boolean>;
}

class SahteEmailService implements EmailService {
  async gonder(aliciEposta: string, konu: string, govde: string): Promise<boolean> {
    if (aliciEposta.endsWith("@gecersiz.example.com")) {
      console.log(`E-posta gönderilemedi: ${aliciEposta}`);
      return false;
    }
    console.log(`E-posta gönderildi -> ${aliciEposta} | Konu: ${konu}`);
    return true;
  }
}

interface OduncKaydi {
  ogrenciEposta: string;
  kitapAdi: string;
  sonTeslimTarihi: string;
}

function hatirlatmaEpostasiOlustur(kayit: OduncKaydi): { konu: string; govde: string } {
  return {
    konu: `Son teslim tarihi yaklaşıyor: ${kayit.kitapAdi}`,
    govde: `Sayın öğrenci, "${kayit.kitapAdi}" adlı kitabın son teslim tarihi ${kayit.sonTeslimTarihi}.`
  };
}

async function sonTeslimHatirlatmasiGonder(emailService: EmailService, kayit: OduncKaydi): Promise<void> {
  const { konu, govde } = hatirlatmaEpostasiOlustur(kayit);
  const gonderildiMi = await emailService.gonder(kayit.ogrenciEposta, konu, govde);

  if (!gonderildiMi) {
    // Not: E-posta gönderilemese bile ödünç kaydının kendisi geçerliliğini korur;
    // bu nedenle burada hata fırlatılmaz, yalnızca durum loglanır.
    console.log(`Uyarı: ${kayit.ogrenciEposta} için hatırlatma gönderilemedi, kayıt yine de geçerlidir.`);
  }
}

const emailService = new SahteEmailService();

await sonTeslimHatirlatmasiGonder(emailService, {
  ogrenciEposta: "elif@ogrenci.mehmetakif.edu.tr",
  kitapAdi: "Java ile Programlama",
  sonTeslimTarihi: "2026-09-15"
});

await sonTeslimHatirlatmasiGonder(emailService, {
  ogrenciEposta: "yasemin@gecersiz.example.com",
  kitapAdi: "TypeScript Temelleri",
  sonTeslimTarihi: "2026-09-16"
});
// Çıktı: E-posta gönderildi -> elif@ogrenci.mehmetakif.edu.tr | Konu: Son teslim tarihi yaklaşıyor: Java ile Programlama
// Çıktı: E-posta gönderilemedi: yasemin@gecersiz.example.com
// Çıktı: Uyarı: yasemin@gecersiz.example.com için hatırlatma gönderilemedi, kayıt yine de geçerlidir.
