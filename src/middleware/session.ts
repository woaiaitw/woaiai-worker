import { createMiddleware } from "hono/factory";
import type { Env } from "../env";
import { createAuth } from "../lib/auth";

export const sessionMiddleware = createMiddleware<Env>(async (c, next) => {
  const auth = createAuth(c.env);
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  c.set("user", session?.user ?? null);
  c.set("session", session?.session ?? null);

  await next();
});
