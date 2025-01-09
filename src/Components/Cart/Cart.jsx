import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './Cart.css'
import { CartContext } from '../../Context/CartContext'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'
import animationCart from '../../assets/images/cart.json'
import Lottie from 'lottie-react'



export default function Cart() {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  scrollToTop();

  let {clearCart , deleteProductItem, loading, updateProductCount, getCart, cart } = useContext(CartContext);

  useEffect(() => {
    getCart();
  }, []);

  return <>

    {loading ? <div className="flex justify-center items-center py-20 mt-10">
      <Loading />
    </div> : <div>
      {cart?.data?.products.length > 0 ? <>
        <h1 className="text-4xl font-bold py-2 text-center ">My Cart <i className="fa-solid fa-cart-flatbed-suitcase text-3xl"></i></h1>
        <div className="relative mt-5 overflow-x-auto  border shadow ">
          <table className="w-full text-sm text-left  text-gray-500">
            <thead className="text-[18px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cart?.data.products.map((product, index) => <tr key={index} className="bg-white border-b text-[17px] hover:bg-gray-50">
                <td className="p-4">
                  <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                </td>
                <td className="px-6 py-4 font-bold text-[#0284c7]">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button onClick={() => updateProductCount(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200   " type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                      </svg>
                    </button>
                    <div>
                      <span>{product.count}</span>
                    </div>
                    <button onClick={() => updateProductCount(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.price} EGP
                </td>
                <td className="px-6 py-4">
                  <button type='button' onClick={() => deleteProductItem(product.product.id)} className="font-medium text-red-600 border-2 p-1 rounded border-red-600">Remove</button>
                </td>
              </tr>
              )}
            </tbody>

          </table>

        </div>

        <button onClick={()=>clearCart()} className='btn w-[4cm] mx-auto block my-5'>Clear All</button>

        <div className="cart flex justify-between items-center">
          <div className="right">
            <Link className=' text-3xl text-[#0284c7]' to={'/'}><i className="fa-solid fa-backward fa-beat-fade"></i></Link>
          </div>
          <div className="cartt my-5 p-3 border border-3 shadow  w-[13cm]">
            <h1 className='text-xl font-bold text-center'>ENTER PROMO CODE</h1>
            <div className="form my-2 flex items-center">
              <input type="text" className="outline-none bg-gray-50 border border-gray-300 text-[#0284c7] focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5 " placeholder='Promo Code' />
              <button className='bg-[#0284c7] text-white font-medium w-1/4 p-2.5 border border-[#0284c7]' type='button'>Submit</button>
            </div>
            <div className="price flex justify-between items-center text-xl my-2">
              <h2>Shipping cost</h2>
              <h2>{cart?.data?.totalCartPrice } EGP</h2>
            </div>
            <div className="discount flex justify-between items-center text-xl my-2">
              <h2>Discount</h2>
              <h2>00 EGP</h2>
            </div>
            <div className="tax flex justify-between items-center text-xl my-2">
              <h2>Tax</h2>
              <h2>00 EGP</h2>
            </div>
            <div className="price flex justify-between items-center text-xl my-2 font-bold">
              <h2>Total Price</h2>
              <h2>{cart?.data?.totalCartPrice} EGP</h2>
            </div>
            <p className='text-lg font-medium text-center my-3 text-[#0284c7]'>Taxes and shipping calculated at checkout Proceed to check</p>
            <Link to={'/checkout'}><button className='btn w-full'>Proceed To Checkout</button></Link>
            
          </div>
        </div>
      </> : <div className='mt-15 text-center'>
        <h1 className='text-center text-[35px] font-bold'>Cart is Empty</h1>
        <h2 className='w-[5cm] mx-auto'><Lottie animationData={animationCart}/></h2>
        <Link to={'/products'} className='bg-[#0284c7] p-1 w-[4.5cm] font-medium cursor-pointer select-none mx-auto text-white'>Go To Products</Link>
      </div>}
    </div>
    }
  </>
}
