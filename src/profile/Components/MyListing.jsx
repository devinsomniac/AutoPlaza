import { Button } from '@/components/ui/button'
import { db } from './../../../configs'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CarImages, CarList } from './../../../configs/schema'
import { desc, eq } from 'drizzle-orm'
import { useUser } from '@clerk/clerk-react'
import {FormatResult} from './../../Shared/Service';
import CarItem from '@/components/CarItem'
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";


const MyListing = () => {
    const {user} = useUser()
    const[carList,setCarList] = useState([])
    useEffect(()=>{
        user&&getUserCarListing()
    },[user])  
    const getUserCarListing =async() => {
        const result = await db.select().from(CarList)
        .leftJoin(CarImages,eq(CarList.id,CarImages.carListId))
        .where(eq(CarList.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(CarList.id))
        const res = FormatResult(result)
        setCarList(res)
        console.log(res)
    }
  return (
    <div className='mt-6'>
        <div className='flex justify-between items-center'>
            <h2 className='font-bold text-4xl'>My Listing</h2>
            <Link to={"/add-listing"}>
                <Button>+ Add New Listing</Button>
            </Link>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5'>
            {carList.map((item,index)=>(
                <div key={index}>
                    <CarItem
                        car={item}
                    />
                    <div className='flex justify-around p-2 rounded-lg gap-2'>
                        <Link to={"/add-listing?mode=edit&id="+item?.id} className='w-full'>
                        <Button variant="outline" className="w-full"><FaEdit/></Button>
                        </Link>
                        <Button variant="destructive"><FaRegTrashAlt /></Button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default MyListing