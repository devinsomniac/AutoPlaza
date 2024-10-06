import { storage } from "./../../../configs/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { db } from "./../../../configs";
import { CarImages } from "./../../../configs/schema";

const UploadImages = ({ triggerUploadImage, setLoader, carInfo, mode }) => {
  const [fileList, setFileList] = useState([]);
  const [editFileList,SetEditFileList] = useState([])

  useEffect(()=>{
    if(mode==="edit" && carInfo){
      SetEditFileList([]); 
      for(let i = 0; i <carInfo?.images?.length;i++ ){
        SetEditFileList((prev)=>[...prev,carInfo.images[i].imageUrl])
        console.log(editFileList)
      }
    }
  },[mode,carInfo])


  useEffect(() => {
    if (triggerUploadImage) {
      console.log("Trigger upload images with ID:", triggerUploadImage);
      uploadImagesToFirebase();
    }
  }, [triggerUploadImage]);


  const onFileSelected = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      setFileList((prevData) => [...prevData, file]);
    }
  };
  const onImageRemove = (image, index) => {
    const newFileResult = fileList.filter((item) => item != image);
    setFileList(newFileResult);

    const updatedList = editFileList.filter((_, i) => i !== index);
    SetEditFileList(updatedList);



  };

  //To get the url of image in firebase

  const uploadImagesToFirebase =  async() => {
    setLoader(true);
    try {
        for (const file of fileList) {
            const fileName = Date.now() + ".jpeg";
            const storageRef = ref(storage, "AutoPlazaImages/" + fileName);
            const metaData = {
                contentType: "image/jpeg",
            };
            await uploadBytes(storageRef, file, metaData);
            console.log("Uploaded file");

            const downloadUrl = await getDownloadURL(storageRef);
            console.log(downloadUrl);
            await db.insert(CarImages).values({
                imageUrl: downloadUrl,
                carListId: triggerUploadImage,
            });
        }
    } catch (error) {
        console.log("Error uploading images:", error);
    } finally {
        setLoader(false);
    }
};


  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5  ">
      {editFileList.map((image, index) => (
          <div key={index}>
            <MdDelete
              className="text-lg text-red-700 absolute m-1"
              onClick={() => onImageRemove(image, index)}
            />
            <img
              src={image}
              className="w-full h-[130px] object-cover hover:shadow-lg rounded-xl"
            />
          </div>
        ))}
        {fileList.map((image, index) => (
          <div key={index}>
            <MdDelete
              className="text-lg text-red-700 absolute m-1"
              onClick={() => onImageRemove(image, index)}
            />
            <img
              src={URL.createObjectURL(image)}
              className="w-full h-[130px] object-cover hover:shadow-lg rounded-xl"
            />
          </div>
        ))}
        <label htmlFor="Upload-Images">
          <div className="border  border-dotted border-primary bg-blue-100 p-10 text-center hover:shadow-lg rounded-xl">
            <h2 className="text-lg text-primary">+</h2>
          </div>
        </label>
        <input
          type="file"
          multiple={true}
          id="Upload-Images"
          className="opacity-0"
          onChange={onFileSelected}
        />
      </div>
    </div>
  );
};

export default UploadImages;
