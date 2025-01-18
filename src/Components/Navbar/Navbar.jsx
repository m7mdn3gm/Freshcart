import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './Navbar.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import { WishListContext } from '../../Context/WishListContext'
import Headroom from 'react-headroom'

export default function Navbar() {
  const [showModel, setShowModel] = useState(false);
  let { wishList, } = useContext(WishListContext);
  let { cart } = useContext(CartContext);
  let { userData, setUserData } = useContext(UserContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login');
  }

  return <>
    <Headroom>
      <section className='navbar bg-gray-200 py-4 shadow-sm'>
        <div className='main px-[8%] mx-auto flex justify-between items-center'>
          <div className="navbarLeft flex items-center">
            <NavLink ><img src={logo} className='w-[200px]' alt="Photo Not Found" /></NavLink>
          </div>
          <div className='navbarMiddle'>
            {userData && <ul className='flex space-x-4 text-[19px] font-bold ms-5 '>
              <li><NavLink to="">Home</NavLink></li>
              <li><NavLink to="products">Products</NavLink></li>
              <li><NavLink to="categories">Categories</NavLink></li>
              <li><NavLink to="brands">Brands</NavLink></li>
              <li><NavLink to="allorders">Orders</NavLink></li>
            </ul>}
          </div>

          {showModel && <div className="show-list-mobile ">
            {userData && <ul className='items space-y-4 text-[19px] font-bold ms-5 shadow '>
              <button onClick={() => setShowModel(false)} ><i className="fa-solid fa-xmark"></i></button>
              <li><NavLink onClick={() => setShowModel(false)} to="">Home</NavLink></li>
              <li><NavLink onClick={() => setShowModel(false)} to="products">Products</NavLink></li>
              <li><NavLink onClick={() => setShowModel(false)} to="categories">Categories</NavLink></li>
              <li><NavLink onClick={() => setShowModel(false)} to="brands">Brands</NavLink></li>
              <li><NavLink onClick={() => setShowModel(false)} to="allorders">Orders</NavLink></li>
            </ul>}
          </div>}

          <div className='navbarRight navbarRight flex items-center cursor-pointer'>
            <div className="icons flex space-x-4 text-[19px]">
              <NavLink target='_blank' to="https://www.facebook.com/"><i className="fa-brands fa-facebook text-blue-900"></i></NavLink>
              <NavLink target='_blank' to="https://www.linkedin.com/"><i className="fa-brands fa-linkedin text-blue-900"></i></NavLink>
              <NavLink target='_blank' to="https://x.com/"><i className="fa-brands fa-x-twitter"></i></NavLink>
              <NavLink target='_blank' to="https://www.instagram.com/"><i className="fa-brands fa-instagram text-red-500"></i></NavLink>
              <NavLink target='_blank' to="https://www.youtube.com/#!;"><i className="fa-brands fa-youtube text-[red]"></i></NavLink>
            </div>

            {userData ? <>
              <div className='cart ms-3 me-3 relative'><NavLink to="cart"><i className="fa-solid fa-cart-shopping text-[26px] text-[#0284c7]"></i></NavLink> <span className='bg-white w-[0.6cm] h-[0.6cm] flex items-center justify-center text-[#0284c7] rounded-full absolute top-[-15px] right-[-10px]'>{cart ? cart.numOfCartItems : 0}</span></div>
              <div className='wishlist relative'><NavLink to="wishlist"><i className="fa-solid fa-heart text-[26px] text-red-500 "></i></NavLink> <span className='bg-white w-[0.6cm] h-[0.6cm] flex items-center justify-center text-red-500 rounded-full absolute top-[-15px] right-[-10px]'>{wishList ? wishList.data.length : 0}</span> </div>
            </> : ''}

            <ul className="links ms-4 space-x-2 flex items-center ">
              {userData ? <>
                <li onClick={() => logOut()} className='logout bth bg-[#0284c7] text-white font-bold text-[17px] p-[5px] '>LogOut</li>
                <li onClick={() => logOut()} className='logout-icon bth bg-[#0284c7] text-white font-bold text-[18px] w-[0.9cm] text-center p-[5px] '><i className="fa-solid fa-arrow-right-from-bracket"></i></li>
                <li className="bars">
                  <button onClick={() => setShowModel(true)}><i className="fa-solid fa-bars text-[26px] ms-2 bg-blue-200 p-[6px] text-[#0284c7]"></i></button>
                </li>
              </> :
                <>
                  <li><NavLink to="register" className='bth bg-[#0284c7] text-white font-bold text-[17px] p-[5px] '>Register</NavLink></li>
                  <li><NavLink to="login" className='bth bg-[#0284c7] text-white font-bold text-[17px] p-[5px] '>Login</NavLink></li>
                </>}
            </ul>
          </div>
        </div>
      </section>
    </Headroom>
  </>
}
