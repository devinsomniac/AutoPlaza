import { Separator } from "@/components/ui/separator"
import React from 'react'
import { LuFuel } from "react-icons/lu";
import { GoMilestone } from "react-icons/go";
import { GiGearStickPattern } from "react-icons/gi";
import { Button } from "@/components/ui/button"

const CarItem = ({car}) => {
  const imageUrl = car?.images?.[0]?.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSekpeEIJGU-elYdLvk4w0Ih04PQ-lg6ce4DfRcU-Jl3Bw3VQzhOdAbCZEjL1QpHZp383A&usqp=CAU'; 
  return (
    <div className="rounded-xl bg-white border hover:shadow-2xl cursor-pointer object-cover">
        <img className='rounded-t-xl h-[180px]' src={imageUrl} width={'100%'} height={250}/>
        <div className="p-4">
            <h2 className=' text-black text-xs md:text-lg md:font-bold mb-2'>{car?.listingTitle}</h2>
        </div>
        <Separator/>
            <div  className="grid grid-cols-3 mt-6">
                <div className="flex flex-col items-center">
                <LuFuel />
                <h3>{car?.fuelType}</h3>
                </div>
                <div className="flex flex-col items-center">
                <GoMilestone />
                <h3>{car?.mileage}</h3>
                </div>
                <div className="flex flex-col items-center">
                <GiGearStickPattern />
                <h3>{car?.transmission}</h3>
                </div>
            </div>
            <Separator/>
            <div className="grid grid-cols-2 items-center text-center my-6">
                <h3 className="font-bold">${car?.sellingPrice}</h3>
                <Button variant="link">View Deal</Button>
            </div>
    </div>
  )
}

export default CarItem