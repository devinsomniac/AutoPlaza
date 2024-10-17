import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import DetailHeader from "../components/DetailHeader";
import { useParams, useSearchParams } from "react-router-dom";
import { db } from "./../../../configs";
import { CarList, CarImages } from "./../../../configs/schema";
import { eq } from "drizzle-orm";
import { FormatResult } from "@/Shared/Service";
import Search from "@/components/Search";
import CarImage from "../components/CarImage";
import Description from "../components/Description";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Specifications from "../components/Specifications";
import Footer from "@/components/Footer";
import OwnerDetails from "../components/OwnerDetails";
import MostSearchCar from "@/components/MostSearchCar";
import Finance from "../components/Finance";

const ListingDetail = () => {
  const [carDetails, setCarDetails] = useState([]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    if (id) {
      getCarDetails();
    }
  }, [id]);
  const getCarDetails = async () => {
    const result = await db
      .select()
      .from(CarList)
      .innerJoin(CarImages, eq(CarList.id, CarImages.carListId))
      .where(eq(CarList.id, Number(id)));
    console.log(result);
    const resp = FormatResult(result);
    console.log(resp[0]);
    setCarDetails(resp[0]);
  };
  return (
    <div>
      <Header />
      <div className="p-10 flex justify-center bg-[#eef0fc]">
        <Search />
      </div>

      <div className="p-10 md:p-20">
        <DetailHeader carDetails={carDetails} />
        <div className="grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5">
            <div className="left md:col-span-2 ">
                {/* Image Gallery */}
                <CarImage carDetails={carDetails}/>
                {/* Description */}
                <Description carDetails={carDetails}/>
                {/* feature List */}
                <Features features={carDetails?.features}/>
                {/* Finance Calculator */}
                <Finance carDetails={carDetails}/>
            </div>
            <div className="right md:col-span-1">
                {/* Pricing */}
                <Pricing carDetails={carDetails}/>
                {/* Properties */}
                <Specifications carDetails={carDetails}/>
                {/* Owner Details */}
                <OwnerDetails carDetails={carDetails}/>
            </div>
        </div>
      </div>
      <MostSearchCar/>
      <Footer/>
    </div>
  );
};

export default ListingDetail;
