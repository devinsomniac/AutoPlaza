import React, { useState } from 'react'
import { FaCheckCircle } from "react-icons/fa";


const Features = ({features}) => {
    console.log(features)
   
  return (
    <div className='mt-6 p-6 bg-slate-100 shadow-lg'>
        <h2 className='font-medium text-2xl my-1'>Features</h2>
        <div className='grid grid-cols-2 md:grid-cols-4'>
        {features && Object.entries(features).map(([key], index) => (
          <div key={index} className='flex items-center gap-2 p-3'>
            <FaCheckCircle className='text-primary' />
            <p className='text-sm'>{key}</p>
          </div>
        ))}
        </div>
    </div>
  )
}

export default Features