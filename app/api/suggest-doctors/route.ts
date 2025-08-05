// // app/api/suggest-doctors/route.ts
// import { NextRequest, NextResponse } from "next/server";

// const keywordToSpecialty: Record<string, string> = {
//   fever: "General Physician",
//   cough: "General Physician",
//   headache: "Neurologist",
//   heart: "Cardiologist",
//   skin: "Dermatologist",
//   eye: "Ophthalmologist",
//   stomach: "Gastroenterologist",
//   anxiety: "Psychiatrist",
//   depression: "Psychiatrist",
//   pain: "Orthopedic",
//   asthma: "Pulmonologist",
// };

// const doctors = [
//   { id: "doc1", name: "Dr. Smith", specialty: "General Physician" },
//   { id: "doc2", name: "Dr. Brown", specialty: "Cardiologist" },
//   { id: "doc3", name: "Dr. Patel", specialty: "Dermatologist" },
//   { id: "doc4", name: "Dr. Mehta", specialty: "Psychiatrist" },
//   { id: "doc5", name: "Dr. Khan", specialty: "Pulmonologist" },
//   { id: "doc6", name: "Dr. Iyer", specialty: "Neurologist" },
//   { id: "doc7", name: "Dr. Gupta", specialty: "Gastroenterologist" },
//   { id: "doc8", name: "Dr. Rao", specialty: "Orthopedic" },
// ];

// export async function POST(req: NextRequest) {
//   const { notes } = await req.json();

//   if (!notes) {
//     return NextResponse.json({ error: "Notes are required" }, { status: 400 });
//   }

//   // Match keywords to specialties
//   const matchedSpecialties = new Set<string>();
//   const lowered = notes.toLowerCase();

//   Object.entries(keywordToSpecialty).forEach(([keyword, specialty]) => {
//     if (lowered.includes(keyword)) {
//       matchedSpecialties.add(specialty);
//     }
//   });

//   // If no matches, return all general physicians
//   const filteredDoctors = matchedSpecialties.size > 0
//     ? doctors.filter(doc => matchedSpecialties.has(doc.specialty))
//     : doctors.filter(doc => doc.specialty === "General Physician");

//   return NextResponse.json(filteredDoctors);
// }


// app/api/suggest-doctors/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { notes } = await request.json();

    if (!notes || typeof notes !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid notes' },
        { status: 400 }
      );
    }

    const lowerNotes = notes.toLowerCase();

    const doctors = [
      { id: 'doctor1', designation: 'General Physician' },
      { id: 'doctor2', designation: 'Pediatrician' },
      { id: 'doctor3', designation: 'Dermatologist' },
      { id: 'doctor4', designation: 'Psychologist' },
      { id: 'doctor5', designation: 'Nutritionist' },
      { id: 'doctor6', designation: 'Cardiologist' },
      { id: 'doctor7', designation: 'Orthopedic Surgeon' },
      { id: 'doctor8', designation: 'Gynecologist' },
      { id: 'doctor9', designation: 'ENT Specialist' },
      { id: 'doctor10', designation: 'Oncologist' },
    ];

    // Expanded keyword map for better matching
    const keywordMap: Record<string, string[]> = {
      'General Physician': ['fever', 'cough', 'cold', 'general'],
      'Pediatrician': ['child', 'baby', 'infant', 'kids'],
      'Dermatologist': ['skin', 'rash', 'acne', 'eczema'],
      'Psychologist': ['stress', 'anxiety', 'mental', 'depression'],
      'Nutritionist': ['diet', 'nutrition', 'weight', 'food'],
      'Cardiologist': ['heart', 'chest pain', 'cardio', 'pulse'],
      'Orthopedic Surgeon': ['bone', 'joint', 'fracture', 'orthopedic'],
      'Gynecologist': ['period', 'pregnancy', 'menstrual', 'gyne'],
      'ENT Specialist': ['ear', 'nose', 'throat', 'sinus'],
      'Oncologist': ['cancer', 'tumor', 'chemotherapy', 'onco'],
    };

    const matchedDoctors = doctors.filter((doc) => {
      const keywords = keywordMap[doc.designation] || [];
      return keywords.some((kw) => lowerNotes.includes(kw));
    });

    return NextResponse.json({
      doctors: matchedDoctors.length > 0 ? matchedDoctors : doctors,
    });
  } catch (err) {
    console.error('[suggest-doctors] Error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
