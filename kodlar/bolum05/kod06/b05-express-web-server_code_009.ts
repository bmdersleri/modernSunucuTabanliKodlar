import express, { NextFunction, Request, Response } from "express";

// Uygulama JSON body verisini route'lardan önce ayrıştırır.
// İstek günlüğü her çağrının görünmesini sağlar.
// Yetki middleware'i korumalı endpoint'leri sınırlar.
const uygulama = express();
const portNumarasi = 3000;

uygulama.use(express.json());

function istekGunlugu(
  istek: Request,
  yanit: Response,
  sonrakiAdim: NextFunction
): void {
  // Gelen metodun ve URL'nin kaydı tutulur.
  // Bu middleware response üretmeden zincire devam eder.
  // next çağrısı olmazsa istek burada bekler.
  console.log(`${istek.method} ${istek.path}`);
  sonrakiAdim();
}

function apiAnahtariKontrolu(
  istek: Request,
  yanit: Response,
  sonrakiAdim: NextFunction
): void {
  // API anahtarı örnek olarak x-api-anahtari başlığından okunur.
  // Geçersiz anahtar için route işleyicisine geçilmez.
  // Geçerli anahtar bulunduğunda next ile devam edilir.
  const apiAnahtari = istek.header("x-api-anahtari");

  if (apiAnahtari !== "kitap-api-2026") {
    yanit.status(401).json({ mesaj: "Yetkisiz istek." });
    return;
  }

  sonrakiAdim();
}

uygulama.use(istekGunlugu);

uygulama.get(
  "/korumali-durum",
  apiAnahtariKontrolu,
  (istek: Request, yanit: Response) => {
    // Bu route yalnızca geçerli anahtar sonrası çalışır.
    // Response tek bir kez gönderilir.
    // JSON biçimi istemci tarafından kolay okunur.
    yanit.json({ mesaj: "Korumalı bilgiye erişildi." });
  }
);

uygulama.listen(portNumarasi, () => {
  // Sunucu belirtilen portta dinlemeye başlar.
  // Middleware sırası tanımlandığı sıraya bağlıdır.
  // Terminal, başlangıç mesajını gösterir.
  console.log(`Sunucu http://localhost:${portNumarasi} adresinde çalışıyor.`);
});

// Çıktı: GET /korumali-durum
// Çıktı: Geçersiz anahtarda 401 {"mesaj":"Yetkisiz istek."}
