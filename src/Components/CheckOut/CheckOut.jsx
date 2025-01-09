import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './CheckOut.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CartContext } from '../../Context/CartContext'

export default function CheckOut() {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  scrollToTop();

  let {checkout} = useContext(CartContext);

  
  let validationSchema = Yup.object().shape({
    phone: Yup.string().matches(/^(002)?01[0125][0-9]{8}$/, 'Phone Must Be Egyption Number').required('Phone Is Required'),
    city: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('City Name Is Required'),
    details: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Details Name Is Required'),
  })

  let formik = useFormik({
    initialValues: {
      phone: '',
      city: '',
      details: '',
    }, validationSchema
    ,onSubmit: checkout,
  })

  return <>
    <div className='checkout-container w-[18cm] mx-auto mt-5 p-10 border shadow'>
      <form onSubmit={formik.handleSubmit}>

      {formik.errors.phone && formik.touched.phone ? <div className="font-medium px-4 py-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {formik.errors.phone}
          </div> : formik.errors.city && formik.touched.city ? <div className="font-medium px-4 py-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {formik.errors.city}
          </div> :  formik.errors.details && formik.touched.details ? <div className="font-medium px-4 py-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {formik.errors.details}
          </div> : ''}
        <h2 className="text-4xl text-center font-bold text-[#0284c7] pb-4">Checkout Now 🕛</h2>


        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2  font-medium text-[#18181b]">Phone :-</label>
          <input type="tel" name='phone' id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="outline-none bg-gray-50 border border-gray-300 text-[#0284c7]  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter Your Phone Number" />
        </div>

        <div className="mb-5">
          <label htmlFor="city" className="block mb-2  font-medium text-[#18181b] ">Countary :-</label>
          <input type="text" name='city' id="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className="outline-none bg-gray-50 border border-gray-300 text-[#0284c7]  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter Your City" />
        </div>

        <div className="mb-5">
          <label htmlFor="details" className="block mb-2  font-medium text-[#18181b] ">Details :-</label>
          <input type="text" name='details' id="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} className="outline-none bg-gray-50 border border-gray-300 text-[#0284c7]  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter Your Details" />
        </div>

        <button type="submit" className=" transition text-white bg-[#0284c7] hover:bg-[#0264c7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg  w-full sm:w-[3.5cm] px-5 py-2.5 mt-4 text-center block mx-auto">CheckOut</button>

      </form>
    </div>


  </>
}
