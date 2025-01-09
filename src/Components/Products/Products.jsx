import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import style from './Products.module.css'
import RecentProducts from '../RecentProducts/RecentProducts';
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function Products() {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const [products, setProducts] = useState([]);

  async function getRecentProducts() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    console.log(data.data);
    setProducts(data.data);
  }

  useEffect(() => {
    getRecentProducts();
  }, [])


  return <>


    {products.length ? <>
      <h1 className="text-4xl font-bold text-center ">Products</h1>
      <button onClick={()=> scrollToTop() }><i className="fa-solid fa-arrow-up fixed z-50 bottom-3 right-3 rounded cursor-pointer bg-[#0284c7] text-white p-2 text-[20px]"></i></button>
      <div className="product-data" >
        {products.map((product, index) => <RecentProducts key={index} product={product} />)}
      </div>
    </> : <div className="flex justify-center items-center py-20 mt-5">
      <Loading />
    </div>}
  </>
}
