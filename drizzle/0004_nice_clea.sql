ALTER TABLE "sessionChatTable" ADD COLUMN "sessionId" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "sessionChatTable" ADD COLUMN "notes" text;--> statement-breakpoint
ALTER TABLE "sessionChatTable" ADD COLUMN "conversation" text;--> statement-breakpoint
ALTER TABLE "sessionChatTable" ADD COLUMN "report" text;--> statement-breakpoint
ALTER TABLE "sessionChatTable" ADD COLUMN "createdBy" varchar(255);--> statement-breakpoint
ALTER TABLE "sessionChatTable" DROP COLUMN "session_id";--> statement-breakpoint
ALTER TABLE "sessionChatTable" DROP COLUMN "doctor_id";--> statement-breakpoint
ALTER TABLE "sessionChatTable" DROP COLUMN "symptoms";--> statement-breakpoint
ALTER TABLE "sessionChatTable" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "sessionChatTable" DROP COLUMN "created_at";