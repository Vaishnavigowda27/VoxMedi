import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await currentUser();

  if (!user?.primaryEmailAddress?.emailAddress) {
    return NextResponse.json({ error: "Email not found." }, { status: 400 });
  }

  try {
    const userEmail = user.primaryEmailAddress.emailAddress;
    const userName = user.fullName || "Anonymous"; // ✅ Prevent null errors

    const existingUsers = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail));

    if (existingUsers.length === 0) {
      const insertedUser = await db
        .insert(usersTable)
        .values({
          name: userName,               // ✅ Now always a string
          email: userEmail,
          credits: 10,
        })
        .returning();

      return NextResponse.json(insertedUser[0]);
    }

    return NextResponse.json(existingUsers[0]);
  } catch (error: any) {
    console.error("Database error:", error);
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}
