import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './MainSlider.css'
import Slider from "react-slick";
import slider1 from '../../assets/images/slider-1.jpeg'
import slider2 from '../../assets/images/slider-2.jpeg'
import slider3 from '../../assets/images/slider-3.jpeg'
import slider4 from '../../assets/images/slider-4.jpeg'
import slider5 from '../../assets/images/slider-5.png'


export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return <>

    <div className="flex justify-center items-center">
      <div className="left-slider w-4/5">
        <Slider {...settings}>
          <img src={slider1} className='shadow border cursor-pointer h-[400px]' alt="" />
          <img src={slider2} className='shadow border cursor-pointer h-[400px]' alt="" />
          <img src={slider3} className='shadow border cursor-pointer h-[400px]' alt="" />
          <img src={slider4} className='shadow border cursor-pointer h-[400px]' alt="" />
          <img src={slider5} className='shadow border cursor-pointer h-[400px]' alt="" />
        </Slider>
      </div>
      <div className="right-slider w-1/5 cursor-pointer">
        <img src={slider3} className='h-[200px]' alt="" />
        <img src={slider2} className='h-[200px]' alt="" />
      </div>
    </div >
  </>
}
