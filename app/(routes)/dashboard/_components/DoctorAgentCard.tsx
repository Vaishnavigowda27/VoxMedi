'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Type definition for props
interface DoctorAgentProps {
  doctorAgent: {
    id: number
    specialist: string
    description: string
    image: string
    agentPrompt: string
  }
}

const DoctorAgentCard: React.FC<DoctorAgentProps> = ({ doctorAgent }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStartConsultation = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/create-session', {
        method: 'POST',
        body: JSON.stringify({
          userId: 'user_123',
          userName: 'Vaishnavi',
          symptoms: `Starting consultation with ${doctorAgent.specialist}`,
          doctorId: doctorAgent.id,
          doctorName: doctorAgent.specialist,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (res.ok && data.sessionId) {
        router.push(`/dashboard/medical-agent/${data.sessionId}`);
      } else {
        console.error('Session creation failed', data);
      }
    } catch (error) {
      console.error('Error starting consultation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-2xl shadow-lg p-4 hover:shadow-xl transition duration-300 bg-white">
      <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden">
        <Image
          src={doctorAgent.image}
          alt={doctorAgent.specialist}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2">{doctorAgent.specialist}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{doctorAgent.description}</p>
      <Button 
        onClick={handleStartConsultation} 
        disabled={loading}
        className="w-full bg-gray-900 hover:bg-gray-800 text-white"
      >
        {loading ? 'Starting...' : 'Start Consultation'}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

export default DoctorAgentCard

