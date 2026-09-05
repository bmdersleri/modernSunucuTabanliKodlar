// Bu tip, FastAPI tarafındaki Pydantic modeliyle birebir eşleşecek şekilde tasarlanmıştır:
// class OneriYaniti(BaseModel):
//     onerilen_kitap_kodlari: list[str]
//     guven_skoru: float

interface OneriYaniti {
  onerilenKitapKodlari: string[];
  guvenSkoru: number;
}

function oneriYanitiniDogrula(veri: unknown): veri is OneriYaniti {
  if (typeof veri !== "object" || veri === null) {
    return false;
  }
  const aday = veri as Record<string, unknown>;
  return (
    Array.isArray(aday.onerilenKitapKodlari) &&
    aday.onerilenKitapKodlari.every((k) => typeof k === "string") &&
    typeof aday.guvenSkoru === "number" &&
    aday.guvenSkoru >= 0 &&
    aday.guvenSkoru <= 1
  );
}

const gecerliYanit = { onerilenKitapKodlari: ["JAVA-101", "PYTHON-201"], guvenSkoru: 0.82 };
console.log(oneriYanitiniDogrula(gecerliYanit));

const gecersizYanit = { onerilenKitapKodlari: ["JAVA-101"], guvenSkoru: 1.5 };
console.log(oneriYanitiniDogrula(gecersizYanit));
// Çıktı: true
// Çıktı: false
