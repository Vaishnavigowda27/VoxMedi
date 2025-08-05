// app/api/session-chat/route.ts

import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { sessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { AIDoctorAgents } from "@/shared/list";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    console.log("Looking for sessionId:", sessionId);

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const session = await db
      .select()
      .from(sessionChatTable)
      .where(eq(sessionChatTable.session_id, sessionId))
      .limit(1);

    console.log("Found session:", session);

    if (session.length === 0) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    // Transform the data to match frontend expectations
    const sessionData = session[0];
    // Find the doctor from the shared list (fix type mismatch)
    const selectedDoctor = AIDoctorAgents.find(doc => doc.id === Number(sessionData.doctor_id));
    const transformedData = {
      sessionId: sessionData.session_id,
      userId: sessionData.user_id,
      userName: sessionData.user_name,
      symptoms: sessionData.symptoms,
      doctorId: sessionData.doctor_id,
      doctorName: sessionData.doctor_name,
      createdAt: sessionData.created_at,
      selectedDoctor: selectedDoctor ? {
        image: selectedDoctor.image,
        specialist: selectedDoctor.specialist,
        agentPrompt: selectedDoctor.agentPrompt,
        voiceId: selectedDoctor.voiceId,
        // Add other fields as needed
      } : null
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("Error fetching session:", error);
    return NextResponse.json(
      { error: "Failed to fetch session", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
