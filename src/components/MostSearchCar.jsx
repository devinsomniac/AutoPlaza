import React from "react";
import fakeData from "@/Shared/fakeData";
import CarItem from "./CarItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const MostSearchCar = () => {
  console.log(fakeData.carList);
  return (
    <div className="mx-24 hidden md:block">
      <h2 className="font-bold text-3xl text-center my-16">
        Most Searched cars
      </h2>
      <Carousel>
        <CarouselContent>
          {fakeData.carList.map((car, index) => (
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
