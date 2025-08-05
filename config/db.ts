// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';

// const sql = neon(process.env.DATABASE_URL!);
// export const db = drizzle(sql); // ✅ Remove the { client: ... }


// config/db.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
