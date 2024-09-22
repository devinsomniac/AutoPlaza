import React from 'react'
import { Textarea } from "@/components/ui/textarea"

const TextArea = ({item,handleInputChange}) => {
  return (
    <div>
        <Textarea name={item.name} onChange = {(e)=>handleInputChange(item.name,e.target.value)} />
    </div>
  )
}

export default TextArea