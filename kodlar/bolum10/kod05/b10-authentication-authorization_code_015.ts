// File: ChapterMiniAppAuth.typescript
// Bu uygulama kullanıcı girişini, token üretimini ve rol tabanlı erişimi uçtan uca işler.
// Repository bellek içi veri kaynağını, service iş kurallarını, controller HTTP benzeri
// yanıtı temsil eder.
// Gerçek projede parola hash'i registration sırasında üretilip veritabanına yazılır.

import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const GIZLI_ANAHTAR = "kutuphane-sunucu-sirri";
type Rol = "ogrenci" | "kutuphaneci";

interface KullaniciKaydi {
  kullaniciAdi: string;
  salt: string;
  parolaHash: string;
  rol: Rol;
}

interface TokenPayload {
  kullaniciAdi: string;
  rol: Rol;
  sonGecerlilik: number;
}

// --- Parola yardımcıları ---
function parolaHashle(duzMetin: string): { salt: string; hash: string } {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(duzMetin, salt, 64).toString("hex");
  return { salt, hash };
}

function parolaDogrula(duzMetin: string, salt: string, kayitliHash: string): boolean {
  const denemeHash = scryptSync(duzMetin, salt, 64);
  return timingSafeEqual(denemeHash, Buffer.from(kayitliHash, "hex"));
}

// --- Token yardımcıları ---
function base64UrlKodla(deger: object): string {
  return Buffer.from(JSON.stringify(deger)).toString("base64url");
}

function imzaOlustur(veri: string): string {
  return createHmac("sha256", GIZLI_ANAHTAR).update(veri).digest("base64url");
}

function tokenUret(payload: TokenPayload): string {
  const header = base64UrlKodla({ alg: "HS256", tip: "JWT" });
  const govde = base64UrlKodla(payload);
  return `${header}.${govde}.${imzaOlustur(`${header}.${govde}`)}`;
}

function tokenDogrula(token: string): TokenPayload {
  const [header, govde, imza] = token.split(".");
  if (imza !== imzaOlustur(`${header}.${govde}`)) {
    throw new Error("401");
  }
  const payload: TokenPayload = JSON.parse(Buffer.from(govde, "base64url").toString());
  if (Date.now() > payload.sonGecerlilik) {
    throw new Error("401");
  }
  return payload;
}

// --- Repository ---
class KullaniciRepository {
  private kullanicilar: KullaniciKaydi[] = [];

  ekle(kullanici: KullaniciKaydi): void {
    this.kullanicilar.push(kullanici);
  }

  bul(kullaniciAdi: string): KullaniciKaydi | undefined {
    return this.kullanicilar.find((k) => k.kullaniciAdi === kullaniciAdi);
  }
}

// --- Service ---
class AuthService {
  constructor(private kullaniciRepository: KullaniciRepository) {}

  kayitOl(kullaniciAdi: string, duzMetinParola: string, rol: Rol): void {
    const { salt, hash } = parolaHashle(duzMetinParola);
    this.kullaniciRepository.ekle({ kullaniciAdi, salt, parolaHash: hash, rol });
  }

  girisYap(kullaniciAdi: string, duzMetinParola: string): string {
    const kayit = this.kullaniciRepository.bul(kullaniciAdi);
    if (!kayit || !parolaDogrula(duzMetinParola, kayit.salt, kayit.parolaHash)) {
      throw new Error("401: Kullanıcı adı veya parola hatalı.");
    }
    return tokenUret({
      kullaniciAdi: kayit.kullaniciAdi,
      rol: kayit.rol,
      sonGecerlilik: Date.now() + 15 * 60 * 1000
    });
  }
}

// --- Controller + RBAC guard ---
function requireRole(izinVerilenRoller: Rol[]) {
  return (payload: TokenPayload): void => {
    if (!izinVerilenRoller.includes(payload.rol)) {
      throw new Error("403: Bu işlem için yetkiniz yok.");
    }
  };
}

class KutuphaneController {
  private sadeceKutuphaneci = requireRole(["kutuphaneci"]);

  kitapEkle(token: string): { durumKodu: number; mesaj: string } {
    try {
      const payload = tokenDogrula(token);
      this.sadeceKutuphaneci(payload);
      return { durumKodu: 201, mesaj: "Kitap eklendi." };
    } catch (hata) {
      const mesaj = (hata as Error).message;
      return { durumKodu: mesaj.startsWith("403") ? 403 : 401, mesaj };
    }
  }
}

// --- Kullanım ---
const kullaniciRepository = new KullaniciRepository();
const authService = new AuthService(kullaniciRepository);
const kutuphaneController = new KutuphaneController();

authService.kayitOl("yasemin", "kutuphaneci-Parola1", "kutuphaneci");
authService.kayitOl("elif", "ogrenci-Parola1", "ogrenci");

const kutuphaneciToken = authService.girisYap("yasemin", "kutuphaneci-Parola1");
const ogrenciToken = authService.girisYap("elif", "ogrenci-Parola1");

console.log(kutuphaneController.kitapEkle(kutuphaneciToken));
console.log(kutuphaneController.kitapEkle(ogrenciToken));
console.log(kutuphaneController.kitapEkle("gecersiz.token.deger"));
// Çıktı: { durumKodu: 201, mesaj: 'Kitap eklendi.' }
// Çıktı: { durumKodu: 403, mesaj: '403: Bu işlem için yetkiniz yok.' }
// Çıktı: { durumKodu: 401, mesaj: '401' }
