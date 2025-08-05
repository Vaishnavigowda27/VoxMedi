// import { AIDoctorAgents } from '@/shared/list'
// import React from 'react'
// import DoctorAgentCard from './DoctorAgentCard'

// function DoctorsAgentList () {
//   return (
//     <div className='mt-10'>
//     <h2 className='font-bold text-xl'>AI Specialist Doctors Agent</h2>
    
//     <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-5'>
//         {AIDoctorAgents.map((doctor,index) => (
//             <div key={index}>
//          <DoctorAgentCard doctorAgent={doctor}/>
//             </div>
//         ))}
//     </div>
    
//     </div>
//   )
// }

// export default DoctorsAgentList


// app/(routes)/dashboard/_components/DoctorsAgentList.tsx

// app/(routes)/dashboard/_components/DoctorsAgentList.tsx

// app/(routes)/dashboard/_components/DoctorsAgentList.tsx

'use client'

import React from 'react'
import { AIDoctorAgents } from '@/shared/list'
import DoctorAgentCard from './DoctorAgentCard'

const DoctorsAgentList = () => {
  return (
    <div className="mt-10">
      <h2 className="font-bold text-xl mb-4">AI Specialist Doctors Agent</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {AIDoctorAgents.map((doctor, index) => (
          <DoctorAgentCard key={index} doctorAgent={doctor} />
        ))}
      </div>
    </div>
  )
}

export default DoctorsAgentList
