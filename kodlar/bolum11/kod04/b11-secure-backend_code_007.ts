// Dosya: CorsMiddleware.typescript
// izinVerilenKokenler, güvenilen frontend adreslerinin sabit bir listesidir.
// Gerçek projede bu liste ortam değişkeninden okunmalıdır.
// Çıktı, izinli ve izinsiz kökenler için farklı kararların üretildiğini gösterir.

const izinVerilenKokenler = ["https://kutuphane.mehmetakif.edu.tr", "http://localhost:5173"];

interface CorsKarari {
  izinliMi: boolean;
  baslik?: { "Access-Control-Allow-Origin": string; "Access-Control-Allow-Credentials": string };
}

function corsKarariVer(istekKokeni: string | undefined): CorsKarari {
  if (!istekKokeni || !izinVerilenKokenler.includes(istekKokeni)) {
    return { izinliMi: false };
  }

  return {
    izinliMi: true,
    baslik: {
      "Access-Control-Allow-Origin": istekKokeni,
      "Access-Control-Allow-Credentials": "true"
    }
  };
}

console.log(corsKarariVer("https://kutuphane.mehmetakif.edu.tr"));
console.log(corsKarariVer("https://kotu-niyetli-site.com"));
// Çıktı: { izinliMi: true, baslik: { 'Access-Control-Allow-Origin': 'https://kutuphane.mehmetakif.edu.tr', 'Access-Control-Allow-Credentials': 'true' } }
// Çıktı: { izinliMi: false }
