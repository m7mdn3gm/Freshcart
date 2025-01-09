import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './Footer.css'
import logo from '../../assets/images/freshcart-logo.svg'
import download1 from '../../assets/images/download.jpeg'
import download2 from '../../assets/images/download (1).jpeg'
import payment1 from '../../assets/images/visa.avif'
import payment2 from '../../assets/images/mastercard.avif'
import payment3 from '../../assets/images/ttt.avif'
import payment4 from '../../assets/images/idcheck.avif'
import payment5 from '../../assets/images/pci.avif'


export default function Footer() {

  return <>

    <section className='waves'>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
    </section>

    <footer className='px-[8%] mx-auto py-[10px] '>
      <h2 className='font-bold text-white text-2xl'>Get The FreshCart App</h2>
      <p className='text-white'>We Will Send You a Link , Open It On Your Phone To Download The App</p>
      <form className="p-4 flex">
        <input type="email" className='caret-[#0284c7] text-[#0284c7] outline-none border-none w-3/4 p-2' placeholder='Enter Your Email ....' />
        <button type='button' className=' p-2 ml-2 w-1/5'>Share App Link</button>
      </form>
      <hr className='bg-[#ccc] border-none rounded h-[1.5px] ' />
      <img src={logo} className='text-center cursor-pointer my-4 w-[6cm] bg-white p-2 mx-auto' alt="" />

      <div className="boxs-footer mb-4">
        <div className="box-footer  text-white text-xl cursor-pointer">
          <h2 className='my-2 text-[#18181a] font-bold text-[25px] '>Contact</h2>
          <h3><span className='mr-2 font-medium'>Adderss :</span> 562 / Tanta / Egypt</h3>
          <h3><span className='mr-2 font-medium' >Phone :</span> 012052738**</h3>
          <h3><span className='mr-2 font-medium'>Hours :</span> 10:00 -18:00 . MON - SAT - !</h3>
        </div>
        <div className="box-footer cursor-pointer text-white text-xl">
          <h2 className='my-2  text-[#18181a] font-bold text-[25px]'>My Account</h2>
          <p className='font-medium'>SignIn</p>
          <p className='font-medium'>View Cart</p>
          <p className='font-medium'>My Wishlist</p>
          <p className='font-medium'>Track My Order</p>
          <p className='font-medium'>Help</p>
        </div>
        <div className="box-footer text-white text-xl cursor-pointer">
          <h2 className='my-2  text-[#18181a] font-bold text-[25px]'>Payments </h2>
          <p className='font-medium'>Safe and easy payments</p>
          <p className='font-medium'>Money-back policy</p>
          <p className='font-medium'>On-time shipping</p>
          <p className='font-medium'>After-sales protections</p>
          <p className='font-medium'>Product monitoring services</p>
        </div>
          <div className="box-footer text-white text-xl cursor-pointer">
          <h2 className='my-2 text-[#18181a] font-bold text-[25px]'>Install App</h2>
          <p className='font-medium'>Get Deliveries With FreshCart</p>
          <img src={download1} className=' my-2' alt="" />
          <img src={download2} className='mt-2' alt="" />
        </div>
      </div>

      <hr className='bg-[#ccc] mt-4 border-none rounded h-[1.5px] ' />
      <div className="payment my-4 flex justify-start items-center gap-4">
        <h2 className='my-2 text-[#18181a] font-bold text-[25px]'>Payment Partners</h2>
        <div className="images flex cursor-pointer">
          <img src={payment1} className='w-[2cm] h-[1cm]' alt="" />
          <img src={payment2} className='w-[2cm] h-[1cm] ml-2' alt="" />
          <img src={payment3} className='w-[2cm] h-[1cm] ml-2' alt="" />
          <img src={payment4} className='w-[3cm] h-[1cm] ml-2' alt="" />
          <img src={payment5} className='w-[2cm] h-[1cm] ml-2' alt="" />
        </div>
      </div>

    </footer>


  </>
}
