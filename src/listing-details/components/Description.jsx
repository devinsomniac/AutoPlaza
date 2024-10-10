import React from 'react'

const Description = ({carDetails}) => {
  return (
    <div className='mt-5 p-5 rounded-xl bg-slate-200 shadow-lg'>
         {carDetails?.listingDescription ? (
            <>
            <h2 className='my-2 font-medium text-2xl'>Description</h2>
            <p>{carDetails?.listingDescription}</p>
            </>
      ) : (
        <div className='w-full h-100 mt-5 rounded-xl animate-pulse bg-slate-500'>

        </div>
      )}
    </div>
  )
}

export default Description