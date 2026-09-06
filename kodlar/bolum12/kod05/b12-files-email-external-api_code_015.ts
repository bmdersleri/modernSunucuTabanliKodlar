// File: ChapterMiniAppFilesEmailApi.ts
// Bu uygulama kitap kapağı yüklemeyi, harici ISBN servisini ve e-posta bildirimini
// uçtan uca işler.
// Repository/service ayrımı önceki bölümlerdeki katmanlı mimariyle tutarlıdır.
// Gerçek projede fetch çağrısı gerçek bir harici servise gider; burada sahte bir servis
// kullanılmıştır.

import { randomUUID } from "node:crypto";

// --- Dosya güvenliği ---
const izinVerilenTurler = new Set(["image/jpeg", "image/png"]);
const azamiBoyutBayt = 2 * 1024 * 1024;

interface YuklenenDosya {
  orijinalAd: string;
  mimeTuru: string;
  boyutBayt: number;
}

function dosyaGuvenlikDenetimiYap(dosya: YuklenenDosya): {
  gecerliMi: boolean; hatalar: string[] } {
  const hatalar: string[] = [];
  if (!izinVerilenTurler.has(dosya.mimeTuru)) hatalar.push(
    `Desteklenmeyen tür: ${dosya.mimeTuru}`);
  if (dosya.boyutBayt > azamiBoyutBayt) hatalar.push(
    `Boyut sınırı aşıldı: ${dosya.boyutBayt} bayt`);
  return { gecerliMi: hatalar.length === 0, hatalar };
}

function guvenliDosyaAdiUret(orijinalAd: string): string {
  const uzanti = orijinalAd.includes(".") ? orijinalAd.split(".").pop() : "bin";
  return `${randomUUID()}.${uzanti}`;
}

// --- Harici API (sahte) + retry ---
class GeciciHata extends Error {}

function bekle(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function yenidenDeneyerekCalistir<T>(islem: () => Promise<T>,
  azamiDeneme = 3): Promise<T> {
  let sonHata: unknown;
  for (let deneme = 1; deneme <= azamiDeneme; deneme++) {
    try {
      return await islem();
    } catch (hata) {
      sonHata = hata;
      if (!(hata instanceof GeciciHata) || deneme === azamiDeneme) throw hata;
      await bekle(20 * deneme);
    }
  }
  throw sonHata;
}

let sahteApiDenemeSayaci = 0;

async function sahteIsbnServisiCagir(isbn: string): Promise<{
  isbn: string; baslik: string }> {
  sahteApiDenemeSayaci += 1;
  if (sahteApiDenemeSayaci < 2) {
    throw new GeciciHata("Geçici ağ hatası.");
  }
  return { isbn, baslik: "Java ile Programlama" };
}

// --- E-posta ---
interface EmailService {
  gonder(aliciEposta: string, konu: string, govde: string): Promise<boolean>;
}

class SahteEmailService implements EmailService {
  async gonder(aliciEposta: string, konu: string): Promise<boolean> {
    console.log(`E-posta gönderildi -> ${aliciEposta} | Konu: ${konu}`);
    return true;
  }
}

// --- Controller ---
async function kitapKapagiYukleVeBilgilendir(
  dosya: YuklenenDosya,
  isbn: string,
  ogrenciEposta: string,
  emailService: EmailService
): Promise<{ durumKodu: number; mesaj: string }> {
  const dogrulama = dosyaGuvenlikDenetimiYap(dosya);
  if (!dogrulama.gecerliMi) {
    return { durumKodu: 400, mesaj: dogrulama.hatalar.join(" ") };
  }

  const guvenliAd = guvenliDosyaAdiUret(dosya.orijinalAd);

  const kitapBilgisi = await yenidenDeneyerekCalistir(() => sahteIsbnServisiCagir(isbn));

  await emailService.gonder(
    ogrenciEposta,
    "Kapak görseli güncellendi",
    `"${kitapBilgisi.baslik}" kitabının kapağı güncellendi.`
  );

  return { durumKodu: 201,
    mesaj: `${guvenliAd} kaydedildi, "${kitapBilgisi.baslik}" için bilgilendirme gönderildi.` };
}

const sonuc = await kitapKapagiYukleVeBilgilendir(
  { orijinalAd: "kapak.jpg", mimeTuru: "image/jpeg", boyutBayt: 204_800 },
  "978-0-13-468599-1",
  "yasemin@kutuphane.mehmetakif.edu.tr",
  new SahteEmailService()
);

console.log(sonuc);
// Çıktı: E-posta gönderildi -> yasemin@kutuphane.mehmetakif.edu.tr | Konu: Kapak
// görseli güncellendi
// Çıktı: { durumKodu: 201, mesaj: '(uuid).jpg kaydedildi, "Java ile Programlama" için
// bilgilendirme gönderildi.' }
