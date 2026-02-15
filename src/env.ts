export type Env = {
  Bindings: {
    DB: D1Database;
    BETTER_AUTH_SECRET: string;
    BETTER_AUTH_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
  };
  Variables: {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string | null;
    } | null;
    session: {
      id: string;
      userId: string;
      expiresAt: Date;
    } | null;
  };
};
