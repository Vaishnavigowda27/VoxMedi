CREATE TABLE "sessionChatTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" varchar(255) NOT NULL,
	"doctor_id" varchar(255) NOT NULL,
	"symptoms" text NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "session_chat" CASCADE;