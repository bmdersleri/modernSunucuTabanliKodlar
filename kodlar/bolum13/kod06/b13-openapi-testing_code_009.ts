// Dosya: LoginEndpoint.integration.test.typescript
// beforeEach, her testten önce test veritabanını sıfırlar ve bilinen bir kullanıcı ekler.
// supertest, gerçek bir HTTP sunucusunu ayağa kaldırmadan istek/yanıt döngüsünü test eder.

import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { app } from "./app";
import { testVeritabaniniSifirla, testKullaniciEkle } from "./test-utils";

describe("POST /auth/login (integration)", () => {
  beforeEach(async () => {
    await testVeritabaniniSifirla();
    await testKullaniciEkle({ kullaniciAdi: "elif", parola: "ogrenci-Parola1", rol: "ogrenci" });
  });

  it("doğru bilgilerle 200 ve token döner", async () => {
    const yanit = await request(app)
      .post("/auth/login")
      .send({ kullaniciAdi: "elif", parola: "ogrenci-Parola1" });

    expect(yanit.status).toBe(200);
    expect(yanit.body.token).toBeDefined();
  });

  it("yanlış parolayla 401 döner", async () => {
    const yanit = await request(app)
      .post("/auth/login")
      .send({ kullaniciAdi: "elif", parola: "yanlis-parola" });

    expect(yanit.status).toBe(401);
  });
});
