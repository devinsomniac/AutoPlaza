import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Category from './components/Category'
import MostSearchCar from './components/MostSearchCar'
import InfoSection from './components/InfoSection'
import Footer from './components/Footer'



const HomePage  = () => {
  return (
    <div>
      {/* Header */}
      <Header/>
      {/* Hero */}
      <Hero/>
      {/* Category */}
      <Category/>
      {/* Most Searched car */}
      <MostSearchCar/>
      {/* Info section */}
      <InfoSection/>
      {/* Footer section */}
      <Footer/>
    </div>
  )
}

export default HomePage