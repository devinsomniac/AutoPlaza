import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState,useEffect } from 'react'

const Finance = ({carDetails}) => {
    const [carPrice,setCarPrice] = useState(carDetails?.sellingPrice || '')
    const [interestRate,setInterestRate] = useState()
    const [loanTerm,setLoanTerm] = useState()
    const [downPayment,setDownPayment] = useState()
    const [monthlyPayment,setMonthlyPayment] = useState()

    const calculateMonthlyPayment = () => {
        const Principle = carPrice-downPayment
        const MonthlyInterestRate = interestRate/1200
        const MonthlyPayment = (Principle*MonthlyInterestRate*Math.pow(1+MonthlyInterestRate,loanTerm))/(Math.pow(1+MonthlyInterestRate,loanTerm)-1)
        console.log(MonthlyPayment)
        setMonthlyPayment(MonthlyPayment)
    }
    useEffect(() => {
        if (carDetails?.sellingPrice) {
          setCarPrice(carDetails.sellingPrice);
        }
      }, [carDetails]);
  return (
    <div className='p-5 rounded-xl border shadow-md mt-7'>
        <h2 className='font-bold text-xl'>Finance Calculator</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 p-4'>
            <Input type="Number" placeholder="Selling Price" value={carPrice} onChange={(e)=>setCarPrice(e.target.value)}/>
            <Input type="Number" placeholder="Interest rate" onChange={(e)=>setInterestRate(e.target.value)}/>
            <Input type="Number" placeholder="Loan Term(Months)" onChange={(e)=>setLoanTerm(e.target.value)}/>
            <Input type="Number" placeholder="Down Payment" onChange={(e)=>setDownPayment(e.target.value)}/>
        </div>
        {monthlyPayment !== null && !isNaN(monthlyPayment) && (
        <h2 className='font-semibold text-2xl'>Your Monthly Payment Is: ${monthlyPayment.toFixed(2)}</h2> // Format the output to 2 decimal places
      )}
        <Button className="w-full mt-5" size="lg" onClick={calculateMonthlyPayment}>Calculate</Button>
    </div>
  )
}

export default Finance