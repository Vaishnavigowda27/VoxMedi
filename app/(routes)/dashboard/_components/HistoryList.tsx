"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react';
import AddNewSessionDialog from './AddNewSessionDialog';

function HistoryList() {
  const [historyList, setHistoryList] = useState([]);
  
  return (
    <div>
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <AddNewSessionDialog />
      </div>

      {/* History Content */}
      <div className="bg-white rounded-lg shadow-sm border">
        {historyList.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="mb-6">
              <Image 
                src="/medical-assistance.jpeg" 
                alt="No consultations" 
                width={200} 
                height={150}
                className="rounded-lg"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Recent Consultations
            </h2>
            <p className="text-gray-600 mb-6 max-w-md">
              It looks like you haven't consulted with any doctors yet.
            </p>
            <AddNewSessionDialog />
          </div>
        ) : (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Consultations</h2>
            <div className="space-y-4">
              {/* Consultation history items would go here */}
              <p className="text-gray-500">No consultations to display</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryList;

