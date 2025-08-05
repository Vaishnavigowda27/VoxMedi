'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { PhoneCall, PhoneOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import Vapi from '@vapi-ai/web';

interface SessionDetail {
  selectedDoctor?: {
    image?: string;
    specialist?: string;
  };
}

type Message = {
  role: string;
  text: string;
};

function MedicalVoiceAgent() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  const [sessionDetail, setSessionDetail] = useState<SessionDetail | null>(null);
  const [callStarted, setCallStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<string>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [currentRole, setCurrentRole] = useState<string | null>(null);

  // Singleton Vapi instance
  const vapiRef = useRef<Vapi | null>(null);

  useEffect(() => {
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY || '');
    const vapi = vapiRef.current;
    if (!vapi) return;

    vapi.on('call-start', () => {
      setCallStarted(true);
      setConnectionStatus('connected');
    });

    vapi.on('call-end', () => {
      setCallStarted(false);
      setConnectionStatus('disconnected');
      setLiveTranscript('');
      setCurrentRole(null);
    });

    vapi.on('message', (message) => {
      if (message.type === 'transcript') {
        const { role, transcript, transcriptType } = message;
        if (transcriptType === 'interim' || transcriptType === 'partial') {
          setLiveTranscript(transcript);
          setCurrentRole(role);
        } else if (transcriptType === 'final') {
          setMessages(prev => [...prev, { role, text: transcript }]);
          setLiveTranscript('');
          setCurrentRole(null);
        }
      }
    });

    vapi.on('speech-start', () => setCurrentRole('assistant'));
    vapi.on('speech-end', () => setCurrentRole('user'));
    vapi.on('error', (error) => {
      console.error('Vapi error:', error);
      setCallStarted(false);
      setConnectionStatus('disconnected');
      alert('Voice agent error. Please check your API key, assistant config, and network connection.');
    });

    return () => {
      vapi.removeAllListeners();
    };
  }, []);

  const GetSessionDetails = async () => {
    try {
      const result = await axios.get(`/api/session-chat?sessionId=${sessionId}`);
      setSessionDetail(result.data);
    } catch (error) {
      console.error('Error fetching session details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionId) GetSessionDetails();
  }, [sessionId]);

  useEffect(() => {
    return () => {
      if (callStarted && vapiRef.current) {
        try {
          vapiRef.current.stop();
        } catch (error) {
          console.error('Error cleaning up Vapi:', error);
        }
      }
    };
  }, [callStarted]);

  const StartCall = async () => {
    const assistantId = process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID;
    if (!assistantId) {
      alert('Assistant ID not configured. Please check your environment variables.');
      return;
    }
    setMessages([]);
    setLiveTranscript('');
    setCurrentRole(null);
    setCallStarted(true);
    setConnectionStatus('connecting');
    // Pass the assistantId as a string directly
    vapiRef.current?.start(assistantId);
  };

  const DisconnectCall = () => {
    try {
      vapiRef.current?.stop();
      setCallStarted(false);
      setConnectionStatus('disconnected');
      setLiveTranscript('');
      setCurrentRole(null);
    } catch (error) {
      console.error('Error disconnecting call:', error);
      setCallStarted(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Loading session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center min-h-screen p-6'>
      <div className='relative flex flex-col items-center border p-8 rounded-xl shadow-md bg-gray-50 max-w-md w-full'>
        {/* Top Status Bar */}
        <div className='absolute top-4 left-4'>
          <h2 className={`px-3 py-1 text-sm font-medium text-white rounded-full ${
            connectionStatus === 'connected' ? 'bg-green-500' :
            connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            {connectionStatus === 'connected' ? 'Connected' :
              connectionStatus === 'connecting' ? 'Connecting...' : 'Not Connected'}
          </h2>
        </div>
        <div className='absolute top-4 right-4'>
          <h2 className='p-1 px-2 border rounded-md flex gap-2 items-center text-gray-400'>
            <span className='w-3 h-3 rounded-full border border-gray-400'></span>
            00:00
          </h2>
        </div>
        {/* Doctor Info */}
        <div className='flex flex-col items-center mt-10 w-full'>
          <Image
            src={sessionDetail?.selectedDoctor?.image || "/doctor1.jpeg"}
            alt={sessionDetail?.selectedDoctor?.specialist || "General Physician"}
            width={160}
            height={100}
            className='h-[100px] w-[160px] object-cover rounded-md'
          />
          <h2 className='mt-2 text-lg font-semibold'>
            {sessionDetail?.selectedDoctor?.specialist || 'General Physician'}
          </h2>
          <p className='text-sm text-gray-400'>AI Medical Voice Agent</p>
          {/* Messages Display */}
          <div className='mt-8 w-full max-h-48 overflow-y-auto'>
            {messages.length === 0 && !liveTranscript ? (
              <div className='text-center'>
                <h2 className='text-gray-400'>Assistant Msg</h2>
                <h2 className='text-lg'>User Msg</h2>
              </div>
            ) : (
              <div className='space-y-2'>
                {messages.map((msg, index) => (
                  <div key={index} className={`text-sm ${msg.role === 'assistant' ? 'text-blue-600' : 'text-gray-700'}`}>
                    <span className='font-medium'>{msg.role}:</span> {msg.text}
                  </div>
                ))}
                {liveTranscript && liveTranscript.length > 0 && (
                  <div className={`text-sm italic ${currentRole === 'assistant' ? 'text-blue-500' : 'text-gray-500'}`}>
                    <span className='font-medium'>{currentRole}:</span> {liveTranscript}
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Start/End Call Button */}
          {!callStarted ? (
            <Button className='mt-8 flex gap-2 items-center bg-gray-800 hover:bg-gray-700' onClick={StartCall}>
              <PhoneCall className="w-4 h-4" /> Start Call
            </Button>
          ) : (
            <Button className='mt-8' variant='destructive' onClick={DisconnectCall}>
              <PhoneOff className="w-4 h-4" /> Disconnect
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MedicalVoiceAgent;