import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import carDetails from "./../Shared/carDetails.json";
import features from "./../Shared/features.json";
import InputField from "./components/InputField";
import DropDown from "./components/DropDown";
import TextArea from "./components/TextArea";
import CheckBox from "./components/CheckBox";
import { Button } from "@/components/ui/button";
import { db } from "./../../configs";
import { desc, eq } from 'drizzle-orm'
import { CarImages, CarList } from "./../../configs/schema";
import UploadImages from "./components/UploadImages";
import { Separator } from "@/components/ui/separator";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { FormatResult } from "@/Shared/Service";



const AddListing = () => {
  const [formdata, setFormData] = useState([]);
  const [feature, setFeature] = useState([]);
  const [triggerUploadImage,setTriggerUploadImage]  = useState()
  const [searchParams] = useSearchParams()
  const [loader,setLoader] = useState(false)
  const navigate = useNavigate()
  const {user} = useUser()
  const [carInfo,setCarInfo] = useState()
  const mode = searchParams.get('mode')
  const recordId = searchParams.get('id')


  useEffect(()=>{
    if(mode==='edit'){
      GetListingDetail()
    }
  },[])


  const GetListingDetail = async() =>{
    const result = await db.select().from(CarList)
    .innerJoin(CarImages,eq(CarList.id,CarImages.carListId))
    .where(eq(CarList.id,recordId))
    const resp = FormatResult(result)
    console.log(resp) 
    setCarInfo(resp[0])
    setFormData(resp[0])
    setFeature(resp[0].features)
    

  }

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
    if(mode === "edit"){
      try{
        await db.update(CarList)
        .set({
          ...formdata,
          features:feature,
          createdBy:user?.primaryEmailAddress?.emailAddress,
          postedOn:Date.now()
        })
        .where(eq(CarList.id,recordId))
        setLoader(false)
        navigate("/profile")
      }catch(e){
        console.error("Error updating the listing", err);
      }
    }else{
    try {
      const result = await db.insert(CarList).values({
        ...formdata,
        features: feature,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        postedOn: Date.now()
      }).returning({id:CarList.id});
      const newId  = result[0]?.id
      setTriggerUploadImage(newId)
      setLoader(false)
      navigate("/profile")
    } catch (err) {
      console.log("There has benn an error", err);
    }
  }
  }
 

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
                <div key={index}>
                  <label className="text-sm ">
                    {item.label}
                    {item.required && <span className="text-red-700">*</span>}
                  </label>
                  {item.fieldType == "text" || item.fieldType == "number" ? (
                    <InputField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType == "dropdown" ? (
                    <DropDown
                      item={item}
                      handleInputChange={handleInputChange}
                      selectedValue={formdata[item.name]}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType == "textarea" ? (
                    <TextArea
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
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
                      feature = {feature}
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
            <UploadImages triggerUploadImage={triggerUploadImage}
             mode = {mode}
             carInfo={carInfo}
             setLoader={(v)=>{setLoader(v);}} />
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
