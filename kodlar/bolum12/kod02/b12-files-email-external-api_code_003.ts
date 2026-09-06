// Dosya: MultipartDosyaOkuma.typescript
// YuklenenDosya, multer gibi bir middleware'in ürettiği yapılandırılmış dosya nesnesini
// temsil eder.
// Gerçek projede bu nesne req.file üzerinden gelir; burada elle oluşturulmuştur.
// Çıktı, dosya meta verisinin okunduğunu gösterir.

interface YuklenenDosya {
  orijinalAd: string;
  mimeTuru: string;
  boyutBayt: number;
  icerik: Buffer;
}

interface KitapKapagiYuklemeIstegi {
  kitapKodu: string;
  dosya: YuklenenDosya;
}

function dosyaMetaVerisiOku(istek: KitapKapagiYuklemeIstegi): string {
  const { dosya } = istek;
  return `Dosya: ${dosya.orijinalAd}, tür: ${dosya.mimeTuru}, boyut: ${dosya.boyutBayt} bayt`;
}

const ornekIstek: KitapKapagiYuklemeIstegi = {
  kitapKodu: "JAVA-101",
  dosya: {
    orijinalAd: "kapak.jpg",
    mimeTuru: "image/jpeg",
    boyutBayt: 204_800,
    icerik: Buffer.from("sahte-goruntu-verisi")
  }
};

console.log(dosyaMetaVerisiOku(ornekIstek));
// Çıktı: Dosya: kapak.jpg, tür: image/jpeg, boyut: 204800 bayt
