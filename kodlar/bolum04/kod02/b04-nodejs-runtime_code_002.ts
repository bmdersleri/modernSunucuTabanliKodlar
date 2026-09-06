// File: ilkProgram.ts
// Node.js runtime bilgilerini terminalden okur.
// Türkçe değişken adları programın amacını görünür kılar.
// Çıktı: Node.js sürümü ve çalışma klasörü terminalde görünür.

console.log("Node.js sürümü:", process.version);
console.log("Çalışma klasörü:", process.cwd());
console.log("Program adı:", process.argv[1]);
