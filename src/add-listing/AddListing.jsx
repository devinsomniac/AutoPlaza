import Header from "@/components/Header";
import React from "react";
import carDetails from "./../Shared/carDetails.json";
import InputField from "./components/InputField";
import DropDown from "./components/DropDown";
import TextArea from "./components/TextArea";

const AddListing = () => {
  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form className="p-10 border rounded-xl mt-10">
          {/* car Details */}
          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>
            <div  className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {carDetails.carDetails.map((item, index) => (
                <div>
                  <label className="text-sm " >{item.label} {item.required&& <span className="text-red-700">*</span>}</label>
                  {item.fieldType == "text" || item.fieldType == "number" ? (
                    <InputField item={item} />
                  ) : item.fieldType == "dropdown" ? <DropDown item={item} />
                  : item.fieldType == "textarea" ? <TextArea item={item}/>
                  :null}
                </div>
              ))}
            </div>
          </div>

          {/* feature List */}
          {/* car Image */}
        </form>
      </div>
    </div>
  );
};

export default AddListing;
