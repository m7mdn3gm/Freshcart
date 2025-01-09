import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './Layout.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {

  return <>
    <Navbar/>
      <div className="mainn px-[8%] mx-auto py-[80px]">
        <Outlet></Outlet>
      </div>

    <Footer/>
  </>
}
