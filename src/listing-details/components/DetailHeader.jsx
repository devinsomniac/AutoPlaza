import React from "react";
import { SlCalender } from "react-icons/sl";
import { IoIosSpeedometer } from "react-icons/io";
import { TbManualGearboxFilled } from "react-icons/tb";
import { MdLocalGasStation } from "react-icons/md";

const DetailHeader = ({ carDetails }) => {
  console.log(carDetails?.listingTitle);
  return (
    <div>
        {carDetails?.listingTitle ? 
        <div>
        <h1 className="text-3xl">Voila !!</h1>
      <h2 className=" text-4xl">{carDetails?.listingTitle}</h2>
      <p>{carDetails?.tagline}</p>
      <div className="flex gap-2 mt-3">
        <div className="flex items-center gap-2 rounded-full bg-blue-100 p-2 px-3">
          <SlCalender className="h-7 w-7 text-primary text-xs" />
          <h2 className="text-primary font-bold text-sm">{carDetails?.year}</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-blue-100 p-2 px-3">
          <IoIosSpeedometer className="h-7 w-7 text-primary text-xs" />
          <h2 className="text-primary font-bold text-sm">
            {carDetails?.mileage}
          </h2>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-blue-100 p-2 px-3">
          <TbManualGearboxFilled className="h-7 w-7 text-primary text-xs" />
          <h2 className="text-primary font-bold text-sm">
            {carDetails?.transmission}
          </h2>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-blue-100 p-2 px-3">
          <MdLocalGasStation className="h-7 w-7 text-primary text-xs" />
          <h2 className="text-primary font-bold text-sm">
            {carDetails?.fuelType}
          </h2>
        </div>
      </div>
        </div> : 
        <div className="w-full rounded-xl h-[100px] bg-slate-300 animate-pulse">

        </div>}
   
    </div>
  );
};

export default DetailHeader;
