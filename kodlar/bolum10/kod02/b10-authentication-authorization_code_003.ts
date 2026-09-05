// Dosya: ParolaHashleme.typescript
// scryptSync, salt ve parolayı birlikte kullanarak yavaş bir hash üretir.
// Salt her kullanıcı için randomBytes ile üretilir ve hash ile birlikte saklanır.
// Çıktı, doğru ve yanlış parola denemelerinin sonucunu gösterir.

import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

interface HashlenmisParola {
  salt: string;
  hash: string;
}

function parolaHashle(duzMetinParola: string): HashlenmisParola {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(duzMetinParola, salt, 64).toString("hex");
  return { salt, hash };
}

function parolaDogrula(duzMetinParola: string, kayitliParola: HashlenmisParola): boolean {
  const denemeHash = scryptSync(duzMetinParola, kayitliParola.salt, 64);
  const kayitliHash = Buffer.from(kayitliParola.hash, "hex");
  return timingSafeEqual(denemeHash, kayitliHash);
}

const kayitliParola = parolaHashle("guclu-Parola123");

console.log(parolaDogrula("guclu-Parola123", kayitliParola));
console.log(parolaDogrula("yanlis-parola", kayitliParola));
// Çıktı: true
// Çıktı: false
