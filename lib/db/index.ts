import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const connectionString = process.env.DATABASE_URL!;

const queryClient =
  globalForDb.conn ?? postgres(connectionString, { prepare: false });

if (process.env.NODE_ENV !== "production") globalForDb.conn = queryClient;

export const db = drizzle<typeof schema>(queryClient, { schema });
