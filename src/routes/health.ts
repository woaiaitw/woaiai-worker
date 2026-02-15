import { Hono } from "hono";
import type { Env } from "../env";

const health = new Hono<Env>();

health.get("/health", (c) => {
  return c.json({ status: "ok" });
});

export default health;
