import React from 'react'

const DetailHeader = ({carDetails}) => {
    console.log(carDetails?.listingTitle)
  return (
    <div>
        <h1 className='text-3xl'>Voila !!</h1>
        <h2 className=' text-4xl'>{carDetails?.listingTitle}</h2>
    </div>
  )
}

export default DetailHeader