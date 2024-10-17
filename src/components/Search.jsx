import React, { useState } from "react";
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
import { Link } from "react-router-dom";


const Search = ({getCarList}) => {
  const [type,setType] = useState(null)
  const [manufacturer,setManufacturer] = useState(null)
  const [price,setPrice] = useState(null)
  return (
    <div className="flex p-8 md:p-5 bg-white rounded-md md:rounded-full flex-col md:flex-row gap-10 px-5 items-center w-full md:w-max">
      
      <Select onValueChange={(value) => setType(value)}>
        <SelectTrigger className="w-[180px] outline-none md:border-none shadow-none text-lg">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
        <SelectItem value="New">New</SelectItem>
        <SelectItem value="Used">Used</SelectItem>
        </SelectContent>
      </Select>
      
      <Separator orientation="vertical" className="hidden md:block" />
      
      <Select onValueChange={(value) => setManufacturer(value)}>
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
      <Link to={"/Search?type=" + type + "&manufacturer=" + manufacturer}>
      <FaSearch className="text-[50px] bg-primary rounded-full p-3 text-white hover:scale-105 transition-all" onClick={getCarList} />
      </Link>
    </div>
  );
};

export default Search;
