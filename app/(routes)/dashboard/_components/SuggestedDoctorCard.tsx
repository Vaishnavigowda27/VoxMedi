// 'use client';

// import Image from 'next/image';
// import React from 'react';

// type doctorAgent = {
//   id: string;
//   image: string;
//   specialist: string;
//   description: string;
// };

// type Props = {
//   doctorAgent: doctorAgent;
//   setSelectedDoctor: (doctor: doctorAgent) => void;
//   selectedDoctor: doctorAgent;
// };

// function SuggestedDoctorCard({ doctorAgent, setSelectedDoctor, selectedDoctor }: Props) {
//   return (
//     <div
//       className={`flex flex-col items-center border rounded-2xl shadow p-5 hover:border-blue-500 cursor-pointer ${
//         selectedDoctor?.id === doctorAgent?.id ? 'border-blue-500' : ''
//       }`}
//       onClick={() => setSelectedDoctor(doctorAgent)}
//     >
//       <Image
//         src={doctorAgent?.image}
//         alt={doctorAgent?.specialist}
//         width={70}
//         height={70}
//         className="w-[50px] h-[50px] rounded-4xl object-cover"
//       />
//       <h2 className="font-bold text-sm text-center">{doctorAgent?.specialist}</h2>
//       <p className="text-xs text-center line-clamp-2">{doctorAgent?.description}</p>
//     </div>
//   );
// }

// export default SuggestedDoctorCard;


'use client';

import Image from 'next/image';
import React from 'react';

type doctorAgent = {
  id: number;
  image: string;
  specialist: string;
  description: string;
};

type Props = {
  doctorAgent: doctorAgent;
  setSelectedDoctor: (doctor: doctorAgent | null) => void;
  selectedDoctor: doctorAgent | null;
};

function SuggestedDoctorCard({
  doctorAgent,
  setSelectedDoctor,
  selectedDoctor,
}: Props) {
  const isSelected = selectedDoctor?.id === doctorAgent.id;

  return (
    <div
      onClick={() => setSelectedDoctor(doctorAgent)}
      className={`rounded-xl border p-4 cursor-pointer transition hover:shadow-md ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
    >
      <Image
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        width={100}
        height={100}
        className="rounded-full mx-auto"
      />
      <h3 className="text-center mt-2 font-semibold text-lg">{doctorAgent.specialist}</h3>
      <p className="text-sm text-center text-gray-600">{doctorAgent.description}</p>
    </div>
  );
}

export default SuggestedDoctorCard;
