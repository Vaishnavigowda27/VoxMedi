import React from 'react';
import HistoryList from './_components/HistoryList';
import DoctorsAgentList from './_components/DoctorsAgentList';

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Main Content */}
      <div className="space-y-8">
        {/* History Section */}
        <HistoryList />
        
        {/* AI Specialist Doctors Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Specialist Doctors Agent</h2>
          <DoctorsAgentList />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
