import { Hono } from "hono";
import { getSchema } from "better-auth/db";
import type { Env } from "../env";
import { createAuth } from "../lib/auth";

const sqliteTypeMap: Record<string, string> = {
  string: "text",
  number: "integer",
  boolean: "integer",
  date: "text",
};

function schemaToSQL(
  schema: ReturnType<typeof getSchema>
): string {
  const statements: string[] = [];
  const sorted = Object.entries(schema).sort(
    ([, a], [, b]) => a.order - b.order
  );
  for (const [tableName, table] of sorted) {
    const cols: string[] = [];
    for (const [fieldName, field] of Object.entries(table.fields)) {
      const fieldType = Array.isArray(field.type) ? field.type[0] : field.type;
      const sqlType = sqliteTypeMap[fieldType] ?? "text";
      let col = `"${fieldName}" ${sqlType}`;
      if (fieldName === "id") col += " primary key";
      if (field.required) col += " not null";
      if (field.unique) col += " unique";
      cols.push(col);
    }
    statements.push(
      `CREATE TABLE IF NOT EXISTS "${tableName}" (${cols.join(", ")});`
    );
  }
  return statements.join("\n");
}

const auth = new Hono<Env>();

// Mount Better Auth handler for all auth routes
auth.on(["GET", "POST"], "/api/auth/**", (c) => {
  const authInstance = createAuth(c.env);
  return authInstance.handler(c.req.raw);
});

// Programmatic D1 migration endpoint
auth.post("/api/auth/migrate", async (c) => {
  const authInstance = createAuth(c.env);
  const schema = getSchema(authInstance.options);
  const sql = schemaToSQL(schema);
  await c.env.DB.exec(sql);
  return c.json({ success: true });
});

export default auth;
