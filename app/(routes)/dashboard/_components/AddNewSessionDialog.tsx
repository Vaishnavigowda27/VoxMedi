'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AIDoctorAgents } from '@/shared/list';
import SuggestedDoctorCard from './SuggestedDoctorCard';

import { useRouter } from 'next/navigation';
import { Loader2, ArrowRight } from 'lucide-react';

type doctorAgent = {
  id: number;
  image: string;
  specialist: string;
  description: string;
};

export default function AddNewSessionDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [symptoms, setSymptoms] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!open) {
      // Reset state when dialog closes
      setStep(1);
      setSymptoms('');
      setSelectedDoctor(null);
    }
  }, [open]);

  const handleStartConsultation = async () => {
    if (!selectedDoctor || !symptoms) return;
    setLoading(true);

    try {
      const res = await fetch('/api/create-session', {
        method: 'POST',
        body: JSON.stringify({
          userId: 'user_123',
          userName: 'Vaishnavi',
          symptoms,
          doctorId: selectedDoctor.id,
          doctorName: selectedDoctor.specialist,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create session');
      }

      const data = await res.json();
      console.log('Session created:', data);
      
      setOpen(false);
      router.push(`/dashboard/medical-agent/${data.sessionId}`);
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Error creating session: ' + error);
    } finally {
      setLoading(false);
    }
  };

  function getSuggestedDoctors(note: string) {
    const lower = note.toLowerCase();
    const mapping = [
      {
        specialist: 'ENT Specialist',
        keywords: [
          'ear', 'nose', 'throat', 'sinus', 'hearing', 'voice', 'tonsil', 'snoring', 'swallowing', 'sore throat', 'difficulty swallowing'
        ]
      },
      {
        specialist: 'Dermatologist',
        keywords: [
          'rash', 'rashes', 'acne', 'eczema', 'psoriasis', 'itch', 'skin', 'allergy', 'dermatitis', 'red', 'itchy'
        ]
      },
      {
        specialist: 'Orthopedic Surgeon',
        keywords: [
          'bone', 'joint', 'muscle', 'fracture', 'sprain', 'arthritis', 'orthopedic', 'back pain', 'body pain', 'knee', 'fall', 'injury', 'pain after falling', 'knee pain'
        ]
      },
      {
        specialist: 'Pediatrician',
        keywords: [
          'child', 'baby', 'infant', 'toddler', 'teenager', 'pediatric', 'fever in child', 'my child', 'my baby', 'my kid', 'my toddler'
        ]
      },
      {
        specialist: 'Gynecologist',
        keywords: [
          'pregnant', 'pregnancy', 'period', 'menstruation', 'gynecology', 'uterus', 'ovary', 'female health', 'gynecologist', 'planning for pregnancy', 'check-up', 'women', 'reproductive'
        ]
      },
      {
        specialist: 'Cardiologist',
        keywords: [
          'heart', 'cardiac', 'chest pain', 'palpitation', 'blood pressure', 'cardiologist', 'walk fast', 'breathless', 'shortness of breath'
        ]
      },
      {
        specialist: 'Oncologist',
        keywords: [
          'cancer', 'tumor', 'oncology', 'oncologist', 'chemotherapy', 'lump', 'sudden weight loss', 'mass', 'growth', 'found a lump'
        ]
      },
      {
        specialist: 'Nutritionist',
        keywords: [
          'diet', 'nutrition', 'weight', 'obesity', 'food', 'eating', 'nutritionist', 'losing weight', 'healthy diet', 'weight loss', 'diet plan'
        ]
      },
      {
        specialist: 'Psychologist',
        keywords: [
          'anxiety', 'depression', 'depressed', 'mental', 'stress', 'psychology', 'psychologist', 'counseling', 'therapy', 'can\'t sleep', 'sleep', 'tired', 'fatigue', 'feel very anxious', 'emotional', 'support', 'can\'t sleep properly', "don't want to talk", "don't want to talk to anyone"
        ]
      },
      {
        specialist: 'General Physician',
        keywords: [
          'cough', 'cold', 'fever', 'headache', 'general', 'fatigue', 'sick', 'illness', 'physician', 'doctor', 'tired', 'all the time', 'frequent', 'common', 'everyday', 'health', 'concerns', 'i feel', 'i have'
        ]
      }
    ];
    // Collect all matching specialists
    let matched = [];
    for (const entry of mapping) {
      for (const keyword of entry.keywords) {
        if (lower.includes(keyword)) {
          matched.push(entry.specialist);
          break;
        }
      }
    }
    // Remove duplicates, preserve order
    matched = [...new Set(matched)];
    // If no match, show General Physician as fallback
    if (matched.length === 0) {
      matched.push('General Physician');
    }
    // Map to doctor objects
    return AIDoctorAgents.filter(doc => matched.includes(doc.specialist));
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gray-900 hover:bg-gray-800 text-white">
          + Start a Consultation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Add Basic Details
          </DialogTitle>
          <DialogDescription className="text-center">
            {step === 1 ? 'Describe your symptoms to get personalized doctor recommendations' : 'Select the most appropriate specialist for your condition'}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="font-semibold mb-2">Add Symptoms or Any Other Details</h2>
              <Textarea
                rows={5}
                placeholder="Describe your symptoms here..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                disabled={!symptoms.trim()}
                onClick={() => setStep(2)}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="font-semibold mb-2">Select the doctor</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
                {getSuggestedDoctors(symptoms).map((doctor) => (
                  <SuggestedDoctorCard
                    key={doctor.id}
                    doctorAgent={doctor}
                    selectedDoctor={selectedDoctor}
                    setSelectedDoctor={setSelectedDoctor}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                Cancel
              </Button>
              <Button
                onClick={handleStartConsultation}
                disabled={!selectedDoctor || loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Starting Consultation...
                  </>
                ) : (
                  <>
                    Start Consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
