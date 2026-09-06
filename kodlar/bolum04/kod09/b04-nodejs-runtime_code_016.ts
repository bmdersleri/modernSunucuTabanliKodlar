// File: yapilandirma.typescript
// Environment variable değerleri her zaman metin olarak gelir.
// Geçersiz veya eksik değer için güvenli varsayılan kullanılır.
// Çıktı: Geçerli port veya varsayılan 3000 görüntülenir.

export function portOku(): number {
  const portMetni = process.env.PORT;
  const portNumarasi = Number(portMetni ?? "3000");

  if (!Number.isInteger(portNumarasi) || portNumarasi < 1 || portNumarasi > 65535) {
    throw new Error("PORT, 1 ile 65535 arasında tam sayı olmalıdır.");
  }

  return portNumarasi;
}
