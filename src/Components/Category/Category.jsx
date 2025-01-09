import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './Category.css'
import axios from 'axios'
import Loading from '../Loading/Loading'

export default function Category() {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  scrollToTop();

  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getCategory() {
    try {
      setLoading(true);
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      console.log(data.data);
      setCategory(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  useEffect(() => {
    getCategory();
  }, [])
  return <>
   {loading ? <div className="flex justify-center items-center py-20 mt-10">
      <Loading />
    </div>  : <>
    <h1 className="text-4xl font-bold mb-2 text-center py-2">All Category</h1>
    <div className="boxs">
      {category.map((product, index) =>
        <div key={index} className="box cursor-pointer border relative ">
          <img src={product.image} className='h-[9.5cm] object-cover' alt="" />
          <div className="layer absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-[#ffffffc7]  ">
            <h1 className='text-3xl font-bold'>{product.name}</h1>
          </div>
        </div>
      )}
    </div>
    </>}
  </>
}
