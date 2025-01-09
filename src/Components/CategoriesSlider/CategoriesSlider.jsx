import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import style from './CategoriesSlider.module.css'
import Slider from "react-slick";
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function CategoriesSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getCategories() {
    setLoading(true);
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    console.log(data.data);
    setCategories(data?.data);
    setLoading(false);
  }
  useEffect(() => {
    getCategories();
  }, [])

  return <>
    <div className="my-5 pb-5">
      <h1 className="text-4xl font-bold py-5">Shop Popular Categories</h1>

 {loading ? <div className="flex justify-center items-center py-5 mt-5 ">
      <Loading/>
    </div> : 
      <Slider {...settings}>
        {categories?.map((category, index) => <div key={index}>
          <img src={category.image} className=' w-[300px] h-[180px] cursor-pointer my-5' alt="" />
          <h2 className='text-[#0284c7] text-center font-bold'>{category.name}</h2>
        </div>)}
      </Slider>} 
    </div>
  </>
}
