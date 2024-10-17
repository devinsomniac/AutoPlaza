import React from 'react';
import { FaUserAlt } from "react-icons/fa";


const OwnerDetails = ({carDetails}) => {

  return (
    <div className='p-5 rounded-xl border shadow-md mt-7'>
      <h2 className='font-bold text-2xl mb-4'>Owner Details</h2>
      
      <div className='flex items-center'>
        {/* User icon */}
        <FaUserAlt className='w-8 h-8 mr-4 text-gray-600' />
        
        {/* Display the createdBy email */}
        <div>
          <p className='font-semibold'>Created By:</p>
          <p>{carDetails.createdByName}</p> 
          <p>{carDetails.createdBy}</p>
        </div>
      </div>
    </div>
  );
};

export default OwnerDetails;
