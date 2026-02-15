import { betterAuth } from "better-auth";
import { D1Dialect } from "kysely-d1";
import type { Env } from "../env";

let cachedAuth: ReturnType<typeof betterAuth> | null = null;
let cachedBindings: Env["Bindings"] | null = null;

export function createAuth(env: Env["Bindings"]) {
  // Return cached instance if bindings haven't changed (same request context)
  if (cachedAuth && cachedBindings === env) {
    return cachedAuth;
  }

  cachedAuth = betterAuth({
    database: {
      dialect: new D1Dialect({ database: env.DB }),
      type: "sqlite",
    },
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      },
      github: {
        clientId: env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET,
      },
    },
    account: {
      accountLinking: {
        enabled: true,
        trustedProviders: ["google", "github"],
      },
    },
    trustedOrigins: [
      "http://localhost:4321",
      "https://woaiai.com",
      "https://www.woaiai.com",
    ],
  });

  cachedBindings = env;
  return cachedAuth;
}
