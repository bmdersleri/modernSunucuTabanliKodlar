// Dosya: DisDunyaGiris.ts
// Bu örnek dosya, harici API ve e-posta etkileşimlerinin ortak sonuç türünü gösterir.
// Her etkileşim başarı veya başarısızlık olarak açıkça modellenmiştir.
// Gerçek projede her fonksiyon kendi hata türünü taşıyabilir.

type Sonuc<T> = { basarili: true; veri: T } | { basarili: false; hata: string };

async function dosyaYukle(): Promise<Sonuc<{ dosyaAdi: string }>> {
  return { basarili: true, veri: { dosyaAdi: "kapak.jpg" } };
}

async function harici_apiCagir(): Promise<Sonuc<{ isbn: string }>> {
  return { basarili: false, hata: "Zaman aşımı." };
}

async function eposta_gonder(): Promise<Sonuc<null>> {
  return { basarili: true, veri: null };
}

async function calistir(): Promise<void> {
  const dosyaSonucu = await dosyaYukle();
  const apiSonucu = await harici_apiCagir();
  const epostaSonucu = await eposta_gonder();

  console.log(dosyaSonucu);
  console.log(apiSonucu);
  console.log(epostaSonucu);
}

await calistir();
// Çıktı: { basarili: true, veri: { dosyaAdi: 'kapak.jpg' } }
// Çıktı: { basarili: false, hata: 'Zaman aşımı.' }
// Çıktı: { basarili: true, veri: null }
