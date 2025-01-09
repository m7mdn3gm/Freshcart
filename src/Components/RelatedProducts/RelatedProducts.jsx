import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './RelatedProducts.css'
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';

export default function RelatedProducts({ products }) {

  let { removeProduct , wishlistCheck , addProductToWishList } = useContext (WishListContext)
  let { addProductToCart } = useContext(CartContext);

  return <>
    <div className="">
      <h1 className=" text-3xl font-bold my-6">Related Products</h1>

      <div className="boxs-product">
        {products.map((product, index)=>  <div key={index} className="box-product relative w-full">
          <img src={product.imageCover} className='w-full object-cover' alt='' />
          <p className='category-product absolute text-[15px] opacity-70 bg-[#0284c7] top-2 left-2  p-1 text-[#fff] font-medium rounded-sm'>{product.brand?.name}</p>
          <div className="main-product p-3">
          <h3 className='font-medium text-[19px] text-[#0284c7]'>{product.category.name}</h3>
            <h3 className=' text-[17px]'>{product.title?.split(' ').slice(0, 2).join(',') || []}</h3>
            <div className="price flex justify-between items-center">
              <h3>{product.price} EGP</h3>
              <h3 className='flex justify-center items-center gap-1'> <i className="fa-solid fa-star text-[#fdcc0d] text-sm"></i> {product.ratingsAverage} </h3>
            </div>
            <button onClick={() => addProductToCart(product.id)} className='btn border-none w-full mt-4'>Add To Cart <i className="fa-brands fa-shopify"></i> </button>
          </div>
          <div className="fav flex flex-col bg-[#fff] shadow rounded">
          <button onClick={()=> { wishlistCheck.some((i) => i === product.id) ? removeProduct(product.id) : addProductToWishList(product.id)} } ><i className={`fa-solid fa-heart ${wishlistCheck.some((i) => i == product.id) ? "text-red-500 bg-red-300 " : "text-[#777] bg-[#ccc]"}`} ></i></button>
      </div>
        </div> )}
      </div>
      
       
        
      </div>
        
      


  </>
}
