ALTER TABLE "sessionChatTable" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "sessionChatTable" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "credits" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "credits" SET NOT NULL;