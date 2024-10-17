import React from 'react'

const CarImage = ({carDetails}) => {
  return (
    <div className='rounded-xl shadow-lg'>
        {carDetails?.images?.length > 0 ? (
        <img
          src={carDetails.images[0].imageUrl}
          alt="Car"
          className="w-full h-[500px] object-contain md:object-cover rounded-xl shadow-lg"
        />
      ) : (
        <div className='w-full h-[500px] rounded-xl animate-pulse bg-slate-500'>

        </div>
      )}
    </div>
  )
}

export default CarImage