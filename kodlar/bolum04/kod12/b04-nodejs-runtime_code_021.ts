// File: sunucu.ts
// Bu program Node.js HTTP sunucusu oluşturur.
// Port bilgisi environment variable üzerinden okunur.
// Çıktı: Sunucu http://localhost:3000 adresinde çalışıyor.

import http from "node:http";
import { portOku } from "./yapilandirma.js";

const uygulamaPortu = portOku();

const sunucu = http.createServer((istek, yanit) => {
  const istekYolu = istek.url ?? "/";
  const istekYontemi = istek.method ?? "GET";

  if (istekYontemi === "GET" && istekYolu === "/") {
    yanit.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    yanit.end(JSON.stringify({ mesaj: "Node.js sunucusuna hoş geldiniz." }));
    return;
  }

  if (istekYontemi === "GET" && istekYolu === "/durum") {
    yanit.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    yanit.end(JSON.stringify({ durum: "çalışıyor", port: uygulamaPortu }));
    return;
  }

  yanit.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  yanit.end(JSON.stringify({ hata: "İstenen kaynak bulunamadı." }));
});

sunucu.listen(uygulamaPortu, () => {
  console.log(`Sunucu http://localhost:${uygulamaPortu} adresinde çalışıyor.`);
});
