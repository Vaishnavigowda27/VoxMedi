import React from 'react'
import AppHeader from './_components/AppHeader';

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader /> 
      <div className="px-6 md:px-10 lg:px-20 py-8">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
