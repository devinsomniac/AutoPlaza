import Header from "@/components/Header";
import Search from "@/components/Search";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./../../../configs";
import { CarImages, CarList } from "./../../../configs/schema";
import { eq } from "drizzle-orm";
import { FormatResult } from "@/Shared/Service";
import CarItem from "@/components/CarItem";
import { Skeleton } from "@/components/ui/skeleton";

const SearchByCategory = () => {
  const { category } = useParams();
  const [carList, setCarList] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    getCarList();
  }, []);

  const getCarList = async () => {
    try {
      const result = await db
        .select()
        .from(CarList)
        .innerJoin(CarImages, eq(CarList.id, CarImages.carListId))
        .where(eq(CarList.category, category));
      console.log(result);
      const resp = FormatResult(result);
      setCarList(resp);
    } catch (error) {
      console.error("Error fetching car list:", error);
    } finally {
      setLoading(false); // Stop loading after data is fetched
    }
  };

  return (
    <div>
      <Header />
      <div className="p-16 bg-black flex justify-center">
        <Search />
      </div>
      <div className="p-10 md:p20">
        <h2 className="font-bold text-4xl ">{category}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5">
          {/* Render loading skeletons if data is still loading */}
          {loading ? (
            // Show skeletons while loading
            <>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col space-y-3">
                  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="bg-slate-400 h-4 w-[250px]" />
                    <Skeleton className="bg-slate-400 h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            // Show car items or a "No cars found" message
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchByCategory;
