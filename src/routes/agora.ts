import { Hono } from "hono";
import type { Env } from "../env";
import { sessionMiddleware } from "../middleware/session";

const agora = new Hono<Env>();

agora.post("/api/agora/token", sessionMiddleware, (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  return c.json({ error: "Not implemented" }, 501);
});

export default agora;
