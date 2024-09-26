import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"

const CheckBox = ({item,handleFeatureChange}) => {
  return (
    <div>
        <Checkbox name={item.label} onCheckedChange = {(value) => handleFeatureChange(item.label,value)} />
    </div>
  )
}

export default CheckBox