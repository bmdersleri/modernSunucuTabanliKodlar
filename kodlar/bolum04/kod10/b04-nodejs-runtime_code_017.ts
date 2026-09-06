// File: portGoster.typescript
// portOku fonksiyonu yapılandırmayı merkezi olarak doğrular.
// Aynı kural tüm uygulamada tekrar kullanılabilir.
// Çıktı: Uygulama portu: 3000 veya verilen port.

import { portOku } from "./yapilandirma.js";

const uygulamaPortu = portOku();
console.log("Uygulama portu:", uygulamaPortu);
