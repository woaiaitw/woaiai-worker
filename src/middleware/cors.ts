import { cors } from "hono/cors";

export const corsMiddleware = cors({
  origin: [
    "http://localhost:4321",
    "https://woaiai.com",
    "https://www.woaiai.com",
  ],
  credentials: true,
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
});
