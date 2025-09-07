import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import BackgroundWrapper from './components/BackgroundWrapper'

const App = () => {
  return (
    <div>
      <BackgroundWrapper>
      <Navbar/> 
      <Outlet/>
      <Footer/>
      </BackgroundWrapper>
    </div>
  )
}

export default App
