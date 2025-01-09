import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './Home.css'
import Products from '../Products/Products.jsx'
import Cart from '../Cart/Cart.jsx'
import axios from 'axios'
import RecentProducts from '../RecentProducts/RecentProducts.jsx'
import Loading from '../Loading/Loading.jsx'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider.jsx'
import MainSlider from '../MainSlider/MainSlider.jsx'

export default function Home() {
  function scrollToTop() {
    window.scrollTo ({
      top : 0,
      behavior : 'smooth'
    })
  }
  
  const [products, setProducts] = useState([]);
  async function getRecentProducts() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    console.log(data.data);
    setProducts(data.data);
  }
  useEffect(() => {
    getRecentProducts();
  }, [])

  return <>
  <MainSlider/>
  <CategoriesSlider/>

    <h1 className="text-4xl font-bold my-3 ">Featured Products</h1>

    {products.length ? <div className="product-data" >
      {products.map((product, index) => <RecentProducts key={index} product={product} />)}
      <button onClick={()=> scrollToTop() }><i className="fa-solid fa-arrow-up fixed bottom-3 right-3 rounded cursor-pointer bg-[#0284c7] text-white p-2 text-[20px]"></i></button>
    </div> : <div className="flex justify-center items-center py-20 mt-10">
      <Loading/>
    </div>}

  </>
}
