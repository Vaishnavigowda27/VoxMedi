// config/schema.ts
import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp
} from "drizzle-orm/pg-core";

// Users Table
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  credits: serial("credits").default(0),
});

// Clean Session Chat Table - Simple and reliable structure
export const sessionChatTable = pgTable("medical_sessions", {
  id: serial("id").primaryKey(),
  session_id: varchar("session_id", { length: 255 }).notNull().unique(),
  user_id: varchar("user_id", { length: 255 }).notNull(),
  user_name: varchar("user_name", { length: 255 }),
  symptoms: text("symptoms").notNull(),
  doctor_id: varchar("doctor_id", { length: 255 }).notNull(),
  doctor_name: varchar("doctor_name", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
