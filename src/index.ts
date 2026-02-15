import { Hono } from "hono";
import type { Env } from "./env";
import { corsMiddleware } from "./middleware/cors";
import health from "./routes/health";
import auth from "./routes/auth";
import agora from "./routes/agora";

const app = new Hono<Env>();

app.use("*", corsMiddleware);

app.route("/", health);
app.route("/", auth);
app.route("/", agora);

export default app;
