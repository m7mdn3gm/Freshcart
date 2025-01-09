import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import style from './AllOrders.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function AllOrders() {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  scrollToTop();

  const [userID, setuserID] = useState("");
  const [orders, setorders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getId() {
    try {
      setLoading(true);
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/auth/verifyToken`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
      );
      setuserID(data.decoded.id);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  async function getOrders(userID) {
    try {
      setLoading(true);
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`);
      setorders(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getId();
  }, []);

  useEffect(() => {
    if (userID) {
      getOrders(userID);
    }
  }, [userID]);


  return <>
    <div>
      {loading ? <div className="flex justify-center items-center py-20 mt-10">
        <Loading />
      </div> : <div>
        {orders.length > 0 ? <div>
          <h1 className="text-4xl font-bold text-center my-3">All Orders</h1>
          {orders.map((order, index) => (
            <div key={index} className="bg-white border-2 shadow border-[#0284c7] p-6 mb-6" >
              <div>
                <h2 className="text-[#0284c7] capitalize text-3xl mb-3 font-bold">{order.shippingAddress.details}</h2>
                <p className="capitalize font-semibold text-xl mt-3"><span className='text-[#0284c7] font-bold'>City :-</span> {order.shippingAddress.city}</p>
                <p className="capitalize font-semibold text-xl mt-3"><span className='text-[#0284c7] font-bold'>Phone :-</span> {order.shippingAddress.phone}</p>
                <h3 className="capitalize text-lg text-[#777] font-bold mt-3"> <span className='text-[#0284c7] font-bold'>Items in this order: :-</span> {order.cartItems.length}</h3>
              </div>
              <div className=" mt-3">
                {order.cartItems.map((item, index) => (
                  <div key={index} className="flex items-center flex-col md:flex-row gap-8 border-t-2 border-[#0284c7] py-3" >
                    <div className="image">
                      <img src={item.product.imageCover} alt='' className="w-[200px]" />
                    </div>
                    <div className="w-full">
                      <p className="font-bold text-xl text-[#0284c7]"> {item.product.title} </p>
                      <p className="font-semibold text-xl mt-2"> {item.product.category.name} </p>
                      <p className="text-[#0284c7] text-bold text-xl my-3"> <span className="text-black font-semibold"> Quantity: </span> {item.count}</p>
                      <p className="text-[#0284c7] text-bold text-xl mb-3"> <span className="text-black font-semibold">Price: </span> ${item.price * item.count} </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div> : <div className='mt-15 text-center'>
          <h1 className='text-center text-[35px] font-bold'>No Orders</h1>
          <h2 className='w-[5cm] mx-auto'><i className="fa-solid fa-ban text-[60px] text-[#0284c7] my-5"></i></h2>
          <Link to={'/products'} className='bg-[#0284c7] p-1 w-[4.5cm] font-medium cursor-pointer select-none mx-auto text-white'>Go To Products</Link>
        </div>}
      </div>
      }
    </div>

  </>
}
