import Header from '@/components/Header'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { db } from "./../../configs";
import { CarImages, CarList } from "./../../configs/schema";
import { eq } from "drizzle-orm";
import { FormatResult } from "@/Shared/Service";
import Search from '@/components/Search';
import CarItem from '@/components/CarItem';

const SearchByOption = () => {
    const [searchParams] = useSearchParams(); // Get the search params
    const [carList, setCarList] = useState([]);
    const type = searchParams.get('type'); // Get the type param
    const manufacturer = searchParams.get('manufacturer'); // Get the manufacturer param
    
    // Fetch the car list when params change
    useEffect(() => {
        if (type && manufacturer) {
            getCarList();
        }
    }, [type, manufacturer]); // Depend on type and manufacturer

    const getCarList = async () => {
        const result = await db
            .select()
            .from(CarList)
            .innerJoin(CarImages, eq(CarList.id, CarImages.carListId))
            .where(eq(CarList.condition, type))
            .where(eq(CarList.make, manufacturer));

        console.log(result); // Debug the result
        const resp = FormatResult(result);
        console.log(resp)
        setCarList(resp);
    };

    return (
        <div>
            <Header />
            <div className="p-16 bg-[#eef0fc] flex justify-center">
                <Search />
            </div>
            {/* Display the car list here */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5 p-10 md:p20">
            {carList.length > 0 ? (
                carList.map((item, index) => (
                  <div key={index}>
                    <CarItem car={item} />
                  </div>
                ))
              ) : (
                <div className="text-center col-span-4">
                  <p>No cars found in this category.</p>
                </div>
              )}
            </div>
            
        </div>
    );
};

export default SearchByOption;
