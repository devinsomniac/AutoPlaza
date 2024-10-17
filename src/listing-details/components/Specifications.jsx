import React from 'react'
import CarSpecification from '@/Shared/CarSpecification'
import { FaCar, FaCheckCircle, FaIndustry, FaCarSide, FaCalendarAlt, FaRoad, FaCogs, FaGasPump, FaTachometerAlt, FaWrench, FaCircle, FaPalette, FaDoorClosed } from "react-icons/fa";


const Specifications = ({carDetails}) => {

  const iconMap = {
    FaCar: FaCar,
    FaCheckCircle: FaCheckCircle,
    FaIndustry: FaIndustry,
    FaCarSide: FaCarSide,
    FaCalendarAlt: FaCalendarAlt,
    FaRoad: FaRoad,
    FaCogs: FaCogs,
    FaGasPump: FaGasPump,
    FaTachometerAlt: FaTachometerAlt,
    FaWrench: FaWrench,
    FaCircle: FaCircle,
    FaPalette: FaPalette,
    FaDoorClosed: FaDoorClosed,
  };
  
  return (
   
    <div className='p-5 rounded-xl border shadow-md mt-7'>
      <h2 className='font-bold text-xl m-3'>Specifications</h2>
      <div>
        {CarSpecification.map((field, index) => {
          const Icon = iconMap[field.icon];
          const value = carDetails[field.name];
          return (
            <div key={index} className='flex justify-between text-primary bg-slate-200 p-3 items-center mt-2 rounded-3xl w-full'>
              <div className='flex items-center'>
              {Icon && <Icon style={{ marginRight: '10px' }} />} 
              <strong style={{ marginRight: '5px' }}>{field.label}:</strong>
              </div>
              <span>{value || 'N/A'}</span> 
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Specifications