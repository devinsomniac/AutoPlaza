import { Separator } from "@/components/ui/separator"
import React from 'react'
import { LuFuel } from "react-icons/lu";
import { GoMilestone } from "react-icons/go";
import { GiGearStickPattern } from "react-icons/gi";
import { Button } from "@/components/ui/button"

const CarItem = ({car}) => {
  return (
    <div className="rounded-xl bg-white border hover:shadow-2xl cursor-pointer">
        <img className='rounded-t-xl' src={car?.image} width={300} height={250}/>
        <div p-4>
            <h2 className=' text-black text-xs md:text-lg md:font-bold mb-2'>{car?.name}</h2>
        </div>
        <Separator/>
            <div  className="grid grid-cols-3 mt-6">
                <div className="flex flex-col items-center">
                <LuFuel />
                <h3>{car?.fuelType}</h3>
                </div>
                <div className="flex flex-col items-center">
                <GoMilestone />
                <h3>{car?.miles}</h3>
                </div>
                <div className="flex flex-col items-center">
                <GiGearStickPattern />
                <h3>{car?.gear}</h3>
                </div>
            </div>
            <Separator/>
            <div className="grid grid-cols-2 items-center text-center my-6">
                <h3 className="font-bold">${car?.price}</h3>
                <Button variant="link">View Deal</Button>
            </div>
    </div>
  )
}

export default CarItem