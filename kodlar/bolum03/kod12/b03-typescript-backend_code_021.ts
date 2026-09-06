// File: tsconfig.typescript
// Bu yapılandırma TypeScript denetimlerini sıkılaştırır.
// strict seçeneği birçok güvenli varsayılanı etkinleştirir.
// Gerçek projede dosya adı tsconfig.json olmalıdır.

const derleyiciAyari = {
  compilerOptions: {
    strict: true,
    target: "ES2022"
  }
};

console.log(derleyiciAyari.compilerOptions.strict);
// Çıktı: true
