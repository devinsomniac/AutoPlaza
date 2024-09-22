import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"

const CheckBox = ({item,handleInputChange}) => {
  return (
    <div>
        <Checkbox name={item.label} onCheckedChange = {(value) => handleInputChange(item.label,value)} />
    </div>
  )
}

export default CheckBox