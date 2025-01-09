import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './WishList.css'
import { WishListContext } from '../../Context/WishListContext'
import Loading from '../Loading/Loading'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'

export default function WishList() {

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  scrollToTop();

  let { addProductToCart } = useContext(CartContext);
  let { removeProduct, loading, getWishList, wishList } = useContext(WishListContext);

  useEffect(() => {
    getWishList();
  }, []);


  return <>

    {loading ? <div className="flex justify-center items-center py-20 mt-10">
      <Loading />
    </div> : <div>
      {wishList?.data?.length > 0 ?
        <>
          <h1 className="text-4xl font-bold my-3 text-center ">WishList <i className="fa-solid fa-heart-circle-bolt text-3xl"></i></h1>
          <div className="boxs-product">
            {wishList?.data.map((product, index) => <div key={index} className="box-product relative w-full">
              <img src={product?.imageCover} className='w-full object-cover' alt='' />
              <p className='category-product absolute text-[15px] opacity-70 bg-[#0284c7] top-2 left-2  p-1 text-[#fff] font-medium rounded-sm'>{product?.brand?.name}</p>
              <div className="main-product p-3">
                <h3 className='font-medium text-[19px] text-[#0284c7]'>{product.title?.split(' ').slice(0, 2).join(',') || []}</h3>
                <div className="price flex justify-between items-center">
                  <h3>{product?.price} EGP</h3>
                  <h3 className='flex justify-center items-center gap-1'> <i className="fa-solid fa-star text-[#fdcc0d] text-sm"></i> {product?.ratingsAverage} </h3>
                </div>
                <button type='button' onClick={() => removeProduct(product?.id)} className="font-medium text-red-600 hover:underline">Remove</button>
                <button onClick={() => addProductToCart(product?.id)} className='btn border-none w-full mt-4'>Add To Cart <i className="fa-brands fa-shopify"></i> </button>
              </div>
            </div>)}
          </div>
        </>
        : <div className='mt-15 text-center'>
        <h1 className='text-center text-[35px] font-bold'> Wishlist Empty</h1>
        <h2 className='w-[5cm] mx-auto'><i className="fa-solid fa-ban text-[60px] text-[#0284c7] my-5"></i></h2>
        <Link to={'/products'} className='bg-[#0284c7] p-1 w-[4.5cm] font-medium cursor-pointer select-none mx-auto text-white'>Go To Products</Link>
      </div>}
    </div>
    }
  </>
}
