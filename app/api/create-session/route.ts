import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { sessionChatTable } from "@/config/schema";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    console.log("=== CREATE SESSION API CALLED ===");
    
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      console.error("❌ DATABASE_URL is not set");
      return NextResponse.json(
        { error: "Database configuration error" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { userId, userName, symptoms, doctorId, doctorName } = body;

    console.log("Received data:", body);

    // Validate input
    if (!userId || !symptoms || !doctorId || !doctorName) {
      console.error("❌ Missing required fields:", { userId, symptoms, doctorId, doctorName });
      return NextResponse.json(
        { error: "Missing required fields", received: body },
        { status: 400 }
      );
    }

    const sessionId = uuidv4();
    console.log("Generated sessionId:", sessionId);

    // Prepare the data object - clean structure
    const sessionData = {
      session_id: sessionId,
      user_id: userId,
      user_name: userName || "Unknown User",
      symptoms: symptoms,
      doctor_id: doctorId.toString(),
      doctor_name: doctorName,
      created_at: new Date(),
    };

    console.log("Data to insert:", sessionData);

    // Insert into database directly (no connection test needed)
    console.log("Attempting database insert...");
    const result = await db.insert(sessionChatTable).values(sessionData).returning();

    console.log("✅ Database insert successful:", result);

    return NextResponse.json({ 
      success: true, 
      sessionId,
      message: "Session created successfully"
    }, { status: 201 });

  } catch (error) {
    console.error("❌ API error in create-session:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });
    
    return NextResponse.json(
      { 
        error: "Internal Server Error", 
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
