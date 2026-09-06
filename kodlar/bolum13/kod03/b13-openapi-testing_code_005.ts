// Dosya: SwaggerUiSunumu.ts
// swagger-ui-express, OpenAPI belgesini /api-docs altında interaktif bir sayfa olarak
// sunar.
// Gerçek projede bu route yalnızca geliştirme/test ortamında veya kimlik doğrulaması
// ardında açılmalıdır.

import express from "express";
import swaggerUi from "swagger-ui-express";
import { openApiBelgesi } from "./openapi";

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiBelgesi));
} else {
  app.use("/api-docs", authMiddleware, requireRole(["kutuphaneci"]), swaggerUi.serve,
    swaggerUi.setup(openApiBelgesi));
}

declare function authMiddleware(req: unknown, res: unknown, next: () => void): void;
declare function requireRole(roller: string[]): (req: unknown, res: unknown,
  next: () => void) => void;
