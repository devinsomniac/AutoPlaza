import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";

const UploadImages = () => {
    const [fileList,setFileList] = useState([])
    const onFileSelected = (event) => {
        const files = event.target.files
        for(let i = 0;i<files?.length;i++){
            const file = files[i]
            setFileList((prevData)=>[...prevData,file])
        }
    }
    const onImageRemove = (image,index) => {
        const result = fileList.filter((item)=>item!=image)
        setFileList(result)
    }
  return (
    <div>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5  '>
        {fileList.map((image,index)=>(
                <div  key={index}>
                    <MdDelete className='text-lg text-red-700 absolute m-1' onClick={()=> onImageRemove(image,index)} />
                    <img src={URL.createObjectURL(image)} className='w-full h-[130px] object-cover hover:shadow-lg rounded-xl'/>
                </div>
            ))}
            <label htmlFor='Upload-Images'>
                <div className='border  border-dotted border-primary bg-blue-100 p-10 text-center hover:shadow-lg rounded-xl'>
                    <h2 className='text-lg text-primary'>+</h2>
                </div>
            </label>
            <input type='file' multiple={true} id='Upload-Images' className='opacity-0' onChange={onFileSelected}/>
           
        </div>
    </div>
  )
}

export default UploadImages