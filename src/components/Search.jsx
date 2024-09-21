import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator"
import { FaSearch } from "react-icons/fa";
import data from "@/Shared/data";


const Search = () => {
  return (
    <div className="flex p-2 md:p-5 bg-white rounded-md md:rounded-full flex-col md:flex-row gap-10 px-5 items-center w-full md:w-max">
      
      <Select>
        <SelectTrigger className="w-[180px] outline-none md:border-none shadow-none text-lg">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
        <SelectItem value="New">New</SelectItem>
        <SelectItem value="Used">Used</SelectItem>
        </SelectContent>
      </Select>
      
      <Separator orientation="vertical" className="hidden md:block" />
      
      <Select>
        <SelectTrigger className="w-[180px] outline-none md:border-none shadow-none text-lg">
          <SelectValue placeholder="Manufacturer" />
        </SelectTrigger>
        <SelectContent>
        {data.Manufacturers.map((Manufacturer,index)=>(
                <SelectItem value={Manufacturer.name}>{Manufacturer.name}</SelectItem>
            ))}
        </SelectContent>
      </Select>
      
      <Separator orientation="vertical" className="hidden md:block" />
      
      <Select>
        <SelectTrigger className="w-[180px] outline-none md:border-none shadow-none text-lg">
          <SelectValue placeholder="Pricing" />
        </SelectTrigger>
        <SelectContent>
            {data.Pricings.map((pricing,index)=>(
                <SelectItem value={pricing.amount}>{pricing.amount}</SelectItem>
            ))}
        </SelectContent>
      </Select>
      <FaSearch className="text-[50px] bg-primary rounded-full p-3 text-white hover:scale-105 transition-all" />
    </div>
  );
};

export default Search;
