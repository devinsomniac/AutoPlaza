import { Button } from '@/components/ui/button'
import { db } from './../../../configs'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CarImages, CarList } from './../../../configs/schema'
import { desc, eq } from 'drizzle-orm'
import { useUser } from '@clerk/clerk-react'
// import {FormatResult} from "../../Shared/Service"


const MyListing = () => {
    const {user} = useUser()
    useEffect(()=>{
        user&&getUserCarListing()
    },[user])  
    const getUserCarListing =async() => {
        const result = await db.select().from(CarList)
        .leftJoin(CarImages,eq(CarList.id,CarImages.carListId))
        .where(eq(CarList.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(CarList.id))
        // const resp = Service.FormatResult(result)
        console.log(result)
    }
  return (
    <div className='mt-6'>
        <div className='flex justify-between items-center'>
            <h2 className='font-bold text-4xl'>My Listing</h2>
            <Link to={"/add-listing"}>
                <Button>+ Add New Listing</Button>
            </Link>
        </div>
    </div>
  )
}

export default MyListing