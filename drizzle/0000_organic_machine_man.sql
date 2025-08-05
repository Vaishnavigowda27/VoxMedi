CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"credits" integer DEFAULT 10 NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
