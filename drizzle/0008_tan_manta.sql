CREATE TABLE "medical_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"user_name" varchar(255),
	"symptoms" text NOT NULL,
	"doctor_id" varchar(255) NOT NULL,
	"doctor_name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "medical_sessions_session_id_unique" UNIQUE("session_id")
);
--> statement-breakpoint
DROP TABLE "sessionChatTable" CASCADE;