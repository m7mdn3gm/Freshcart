import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './Brands.css'
import axios from 'axios'
import Loading from '../Loading/Loading'

export default function Brands() {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  scrollToTop();

  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(false);
  async function getBrands() {
    try {
      setLoading(true);
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      console.log(data.data);
      setBrands(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  useEffect(() => {
    getBrands();
  }, [])
  return <>
  {loading ? <div className="flex justify-center items-center py-20 mt-10">
      <Loading />
    </div>  : <>
    <h1 className="text-4xl font-bold mb-2 text-center py-2">All Brands</h1>
    <div className="boxs-brands">
      {brands.map((product, index) =>
        <div key={index} className="box-brands shadow cursor-pointer border relative ">
          <img src={product.image} alt="" />
            <h1 className='text-3xl font-bold text-center opacity-25'>{product.name}</h1>
        </div>
      )}
    </div>
    </> }

  </>
}
