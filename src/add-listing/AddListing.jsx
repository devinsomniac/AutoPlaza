import Header from "@/components/Header";
import React, { useState } from "react";
import carDetails from "./../Shared/carDetails.json";
import features from "./../Shared/features.json";
import InputField from "./components/InputField";
import DropDown from "./components/DropDown";
import TextArea from "./components/TextArea";
import CheckBox from "./components/CheckBox";
import { Button } from "@/components/ui/button";
import { db } from "./../../configs";
import { CarList } from "./../../configs/schema";
import UploadImages from "./components/UploadImages";
import { Separator } from "@/components/ui/separator";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Toaster } from "../components/ui/sonner";
import { toast } from "../components/ui/sonner";
import { useNavigate, useNavigation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import moment from "moments"


const AddListing = () => {
  const [formdata, setFormData] = useState([]);
  const [feature, setFeature] = useState([]);
  const [triggerUploadImage,setTriggerUploadImage]  = useState()
  const [loader,setLoader] = useState(false)
  const navigate = useNavigate()
  const {user} = useUser()
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFeatureChange = (name, value) => {
    setFeature((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(feature);
  };

  const onSubmit = async (e) => {
    setLoader(true)
    e.preventDefault();
    console.log(formdata);
    toast('Please Wait ...')
    try {
      const result = await db.insert(CarList).values({
        ...formdata,
        features: feature,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        postedOn: moment().format('DD/MM/yyyy')
      }).returning({id:CarList.id});
      if (result) {
        console.log("Data Saved", formdata);
        setTriggerUploadImage(result[0]?.id)
        setLoader(false)
      }
    } catch (err) {
      console.log("There has benn an error", err);
    }
  };

  console.log(formdata);
  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form className="p-10 border rounded-xl mt-10">
          {/* car Details */}
          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {carDetails.carDetails.map((item, index) => (
                <div>
                  <label className="text-sm ">
                    {item.label}{" "}
                    {item.required && <span className="text-red-700">*</span>}
                  </label>
                  {item.fieldType == "text" || item.fieldType == "number" ? (
                    <InputField
                      item={item}
                      handleInputChange={handleInputChange}
                    />
                  ) : item.fieldType == "dropdown" ? (
                    <DropDown
                      item={item}
                      handleInputChange={handleInputChange}
                      selectedValue={formdata[item.name]}
                    />
                  ) : item.fieldType == "textarea" ? (
                    <TextArea
                      item={item}
                      handleInputChange={handleInputChange}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6" />
          {/* feature List */}
          <div className="my-5">
            <h2 className="font-medium text-xl mb-6">Feature list</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 ">
              {features.features.map((item, index) => (
                <div key={index} className="flex gap-3">
                  {item.fieldType == "checkbox" ? (
                    <CheckBox
                      item={item}
                      handleFeatureChange={handleFeatureChange}
                    />
                  ) : null}
                  <label>{item?.label}</label>
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6" />

          {/* car Image */}

          <div>
            <h2 className="font-medium text-xl mb-6">Upload The Car Image</h2>
            <UploadImages triggerUploadImage={triggerUploadImage} setLoader={(v)=>{setLoader(v);navigate('/profile')}} />
          </div>
          <div className="mt-10 flex justify-end">


            {/*The Submit Button of the form */}
            <Button type="submit" onClick={(e) => onSubmit(e)} disabled={loader}>
              {!loader ? 'Submit' : <AiOutlineLoading3Quarters className="animate-spin text-lg" />}
            </Button>
          </div>
          <Separator className="my-6" />
        </form>
       
      </div>
    </div>
  );
};

export default AddListing;
