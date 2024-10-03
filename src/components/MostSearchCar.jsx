import React, { useState ,useEffect} from "react";
import fakeData from "@/Shared/fakeData";
import CarItem from "./CarItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {db} from './../../configs'
import { CarImages, CarList } from './../../configs/schema'
import { desc, eq } from 'drizzle-orm'
import {FormatResult} from './../Shared/Service';

const MostSearchCar = () => {
  const [carList,setCarList] = useState([])
  useEffect(() => {
    getPopularCarList();
  }, []);
  const getPopularCarList = async() => {
    const result = await db.select()
    .from(CarList)
    .leftJoin(CarImages,eq(CarList.id,CarImages.carListId))
    .orderBy(desc(CarList.id))
    .limit(6)
    const res = FormatResult(result)
    setCarList(res)
    console.log(res)
  }
  return (
    <div className="mx-24 hidden md:block">
      <h2 className="font-bold text-3xl text-center my-16">
        Most Searched cars
      </h2>
      <Carousel>
        <CarouselContent>
          {carList.map((car, index) => (
            <CarouselItem className="basis-1/4">
              <CarItem car={car} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default MostSearchCar;
