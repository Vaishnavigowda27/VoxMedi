CREATE TABLE "session_chat" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" varchar(255) NOT NULL,
	"doctor_id" varchar(255) NOT NULL,
	"symptoms" text NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "credits" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "credits" DROP NOT NULL;