import React from 'react'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import Products from './Components/Products/Products'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import NotFound from './Components/NotFound/NotFound'
import Categories from './Components/Category/Category'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import WishList from './Components/WishList/WishList'
import WishListContextProvider from './Context/WishListContext'
import RelatedProducts from './Components/RelatedProducts/RelatedProducts'
import CheckOut from './Components/CheckOut/CheckOut'
import AllOrders from './Components/AllOrders/AllOrders'


let routers = createHashRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute> <WishList /> </ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute> <Products /> </ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute> <CheckOut /> </ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute> <AllOrders /> </ProtectedRoute> },
      { path: 'productdetails/:id', element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
      { path: 'relatedproducts', element: <ProtectedRoute> <RelatedProducts /> </ProtectedRoute> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: '*', element: <NotFound /> },
    ]
  }
])

export default function App() {
  return <WishListContextProvider>
    <CartContextProvider>
      <UserContextProvider>
        <RouterProvider router={routers}></RouterProvider>
        <Toaster />
      </UserContextProvider>
    </CartContextProvider>
  </WishListContextProvider>
}
