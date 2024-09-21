import React from "react";
import data from "@/Shared/data";

const Category = () => {
  return (
    <div className="mt-40 mb-40">
      <h2 className="font-bold text-2xl text-center mb-6">Browse By Type</h2>
      <div
        className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6
        lg:grid-cols-9 gap-6 px-20"
      >
        {data.Categories.map((Category, index) => (
          <div
            className="border rounded-xl p-3 
                items-center flex flex-col hover:shadow-md cursor-pointer text-sm"
          >
            <img src={Category.icon} width={35} height={35} />
            <h2>{Category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
