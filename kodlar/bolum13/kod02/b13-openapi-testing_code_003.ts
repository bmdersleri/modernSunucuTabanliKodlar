// Dosya: OpenApiSozlesmesi.typescript
// Bu örnek OpenAPI 3.x path tanımının TypeScript nesnesi biçiminde bir alt kümesini gösterir.
// Gerçek projede bu yapı openapi.yaml veya openapi.json dosyasında tutulur.
// Çıktı, sözleşmenin JSON biçiminde üretilebildiğini gösterir.

interface OpenApiYaniti {
  description: string;
  content: {
    "application/json": {
      schema: { type: string; properties: Record<string, { type: string }> };
    };
  };
}

interface OpenApiPathTanimi {
  post: {
    summary: string;
    requestBody: {
      required: boolean;
      content: {
        "application/json": {
          schema: { type: string; required: string[]; properties: Record<string, { type: string }> };
        };
      };
    };
    responses: Record<string, OpenApiYaniti>;
  };
}

const loginPathTanimi: Record<string, OpenApiPathTanimi> = {
  "/auth/login": {
    post: {
      summary: "Kullanıcı adı ve parola ile giriş yapar, JWT üretir.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["kullaniciAdi", "parola"],
              properties: {
                kullaniciAdi: { type: "string" },
                parola: { type: "string" }
              }
            }
          }
        }
      },
      responses: {
        "200": {
          description: "Giriş başarılı, token döner.",
          content: { "application/json": { schema: { type: "object", properties: { token: { type: "string" } } } } }
        },
        "401": {
          description: "Kullanıcı adı veya parola hatalı.",
          content: { "application/json": { schema: { type: "object", properties: { mesaj: { type: "string" } } } } }
        }
      }
    }
  }
};

console.log(JSON.stringify(loginPathTanimi["/auth/login"].post.responses["200"].description));
// Çıktı: "Giriş başarılı, token döner."
