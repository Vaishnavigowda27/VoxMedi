import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const menuOptions = [
  {
    id: 1,
    name: 'Home',
    path: '/home'
  },
  {
    id: 2,
    name: 'History',
    path: '/history'
  },
  {
    id: 3,
    name: 'Pricing',
    path: '/pricing'
  },
  {
    id: 4,
    name: 'Profile',
    path: '/profile'
  }
]

function AppHeader() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between p-4 px-6 md:px-10 lg:px-20">
        <div className="flex items-center">
          <Image src="/logo.svg" alt="logo" width={120} height={40} />
        </div>
        
        <div className="hidden md:flex gap-8 items-center">
          {menuOptions.map((option) => (
            <div key={option.id}>
              <h2 className="text-gray-700 hover:text-gray-900 hover:font-medium cursor-pointer transition-all">
                {option.name}
              </h2>
            </div>
          ))}
        </div>
        
        <UserButton />
      </div>
    </div>
  )
}

export default AppHeader
