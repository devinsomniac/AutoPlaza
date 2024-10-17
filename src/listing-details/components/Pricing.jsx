import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from "react-icons/fa";


const Pricing = ({carDetails}) => {
  return (
    <div className='w-full h-[180px] bg-white shadow-2xl border border-black  rounded-lg p-8'>
        <h2>Our Price</h2>
        <h1 className='font-bold text-4xl' my-2>$ {carDetails.sellingPrice}</h1>
        <Link to={"/"}>
        <Button className="flex gap-3 my-2 w-full">
            <FaHome />
            <p>Go to Home</p>
        </Button>
        </Link>
    </div>
  )
}

export default Pricing