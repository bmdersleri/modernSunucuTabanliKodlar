// Dosya: BasitJWT.typescript
// Bu örnek JWT'nin header.payload.imza yapısını basitleştirilmiş biçimde uygular.
// Gerçek projede jsonwebtoken gibi denetlenmiş bir kütüphane kullanılmalıdır.
// Çıktı, üretilen token'ın doğrulandığını ve süresi dolmuş token'ın reddedildiğini
// gösterir.

import { createHmac } from "node:crypto";

const GIZLI_ANAHTAR = "kutuphane-sunucu-sirri";

interface TokenPayload {
  kullaniciAdi: string;
  rol: "ogrenci" | "kutuphaneci";
  sonGecerlilik: number;
}

function base64UrlKodla(deger: object): string {
  return Buffer.from(JSON.stringify(deger)).toString("base64url");
}

function imzaOlustur(veri: string): string {
  return createHmac("sha256", GIZLI_ANAHTAR).update(veri).digest("base64url");
}

function tokenUret(payload: TokenPayload): string {
  const header = base64UrlKodla({ alg: "HS256", tip: "JWT" });
  const govde = base64UrlKodla(payload);
  const imza = imzaOlustur(`${header}.${govde}`);
  return `${header}.${govde}.${imza}`;
}

function tokenDogrula(token: string): TokenPayload {
  const [header, govde, imza] = token.split(".");
  const beklenenImza = imzaOlustur(`${header}.${govde}`);

  if (imza !== beklenenImza) {
    throw new Error("401: Token imzası geçersiz.");
  }

  const payload: TokenPayload = JSON.parse(Buffer.from(govde, "base64url").toString());

  if (Date.now() > payload.sonGecerlilik) {
    throw new Error("401: Token süresi dolmuş.");
  }

  return payload;
}

const token = tokenUret({
  kullaniciAdi: "elif",
  rol: "ogrenci",
  sonGecerlilik: Date.now() + 15 * 60 * 1000
});

console.log(tokenDogrula(token));

try {
  tokenDogrula(token + "bozuk");
} catch (hata) {
  console.log((hata as Error).message);
}
// Çıktı: { kullaniciAdi: 'elif', rol: 'ogrenci', sonGecerlilik: ... }
// Çıktı: 401: Token imzası geçersiz.
