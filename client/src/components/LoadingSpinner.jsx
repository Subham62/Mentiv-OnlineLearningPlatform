import { Loader2 } from 'lucide-react';
import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
        <Loader2 className='animate-spin h-16 w-16 text-MentivPurple'/>
        <p className="mt-4 text-lg font-semibold text-gray-700">Loading, please wait</p>
    </div>
  )
}

export default LoadingSpinner

// import React from "react";
// import loading from './Ajax-loader.gif'

// const LoadingSpinner = () => {
//   return (
//     <div className="flex flex-col items-center justify-center  ">
//       <img className="my-3" src={loading} alt="loading"></img>
//       <p className="mt-4 text-lg font-semibold text-gray-700">Loading, please wait</p>
//     </div>
//   );
// };

// export default LoadingSpinner;
