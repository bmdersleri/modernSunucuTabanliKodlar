// Cihazdan gelen örnek JSON gövdesi:
// { "cihazId": "esp32-okuma-salonu-01", "sicaklik": 21.5, "nem": 45.2, "zamanDamgasi":
// "2026-09-05T10:00:00Z" }

interface TelemetriIstegi {
  cihazId: string;
  sicaklik: number;
  nem: number;
  zamanDamgasi: string;
}

function telemetriIsteginiIsle(istek: unknown): { kabul: boolean; mesaj: string } {
  const veri = istek as TelemetriIstegi;
  console.log(`Cihaz: ${veri.cihazId}, Sıcaklık: ${veri.sicaklik}°C, Nem: %${veri.nem}`);
  return { kabul: true, mesaj: "Telemetri alındı." };
}

const sonuc = telemetriIsteginiIsle({
  cihazId: "esp32-okuma-salonu-01",
  sicaklik: 21.5,
  nem: 45.2,
  zamanDamgasi: "2026-09-05T10:00:00Z"
});
console.log(sonuc.mesaj);
// Çıktı: Cihaz: esp32-okuma-salonu-01, Sıcaklık: 21.5°C, Nem: %45.2
// Çıktı: Telemetri alındı.
