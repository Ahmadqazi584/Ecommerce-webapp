import React from 'react'
import { FadeLoader } from 'react-spinners'; // Import the loader

const CustomLoader = ({text}) => {
  return (
    <div className="flex justify-center items-center w-full h-[450px]">
        <div className='flex flex-col items-center gap-1'>
            <FadeLoader />
            <p className='text-slate-800'>{text}</p>
        </div>
    </div>
  )
}

export default CustomLoader