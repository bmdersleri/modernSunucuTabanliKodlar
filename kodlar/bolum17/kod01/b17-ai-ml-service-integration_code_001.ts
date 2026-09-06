interface OzetIstegi {
  kitapAciklamasi: string;
}

interface OzetYaniti {
  ozet: string;
}

async function kitapOzetiIste(kitapAciklamasi: string,
  servisTabanUrl: string): Promise<OzetYaniti> {
  const yanit = await fetch(`${servisTabanUrl}/ozetle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kitapAciklamasi } satisfies OzetIstegi)
  });
  if (!yanit.ok) {
    throw new Error(`AI servisi hata döndürdü: ${yanit.status}`);
  }
  return (await yanit.json()) as OzetYaniti;
}

const ozet = await kitapOzetiIste(
  "Bu kitap veri yapıları ve algoritmaları örneklerle anlatır.",
  "http://ai-servis:8000"
);
console.log(ozet.ozet);
// Çıktı: Kısa bir veri yapıları ve algoritmalar özeti.
