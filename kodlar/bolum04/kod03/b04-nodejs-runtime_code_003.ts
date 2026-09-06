// File: sistemBilgisi.ts
// Node'un os modülü işletim sistemi bilgisi sağlar.
// Bu örnek tarayıcıda değil, Node.js runtime içinde çalışır.
// Çıktı: İşletim sistemi ve işlemci mimarisi görüntülenir.

import os from "node:os";

const isletimSistemiAdi = os.platform();
const islemciMimarisi = os.arch();

console.log("İşletim sistemi:", isletimSistemiAdi);
console.log("İşlemci mimarisi:", islemciMimarisi);
