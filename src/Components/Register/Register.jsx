import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import style from './Register.module.css'
import registerr from '../../assets/images/Sign up.svg'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'


export default function Register() {

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  scrollToTop();

  const [apiError, setapiError] = useState(null);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let {setUserData} = useContext(UserContext);

  async function handleRegister(values) {
    try {
      setLoading(true);
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
      console.log(data.message); // Success
      localStorage.setItem('userToken', data.token);
      navigate('/');
      setUserData(data.token);
      setLoading(false);

    } catch (err) {
      console.log(err.response.data.message);  // Account Exisit 
      setapiError(err.response.data.message);

      setLoading(false);
    }
  }
  // function validateForm(values) {
  //   let errors = {};
  //   // Validation Name
  //   if (!values.name) { // == (values.name === "")
  //     errors.name = 'Name Is Required';
  //   }
  //   else if (!/^[A-Z][a-z]{2,10}$/.test(values.name)) {
  //     errors.name = 'Name Must Starts With Capital Letter';
  //   }
  //   // Validation Phone
  //   if (!values.phone) {
  //     errors.phone = 'Phone Is Required'
  //   } else if (!/^(002)?01[0125][0-9]{8}$/.test(values.phone)) {
  //     errors.phone = 'Phone Must Be Egyption Number';
  //   }

  //   return errors;
  // }

  let validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Name Is Required'),
    email: Yup.string().email('Invalid Email').required('Email Is Required'),
    password: Yup.string().matches(/^\w{5,10}$/, 'Password Invalid').required('Password Is Required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], "Password Don't Match").required('rePassword Is Required'),
    phone: Yup.string().matches(/^(002)?01[0125][0-9]{8}$/, 'Phone Must Be Egyption Number').required('Phone Is Required'),
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    }, validationSchema: validationSchema, // == validationSchema
    onSubmit: handleRegister,
  })

  return <>

    <div className={`${style.register} pt-10 flex justify-center items-center gap-4`}>

      <div className={`${style.forms} w-1/2 border shadow p-10`}>
        <form onSubmit={formik.handleSubmit}>

          {apiError && <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div className='font-medium'>
              {apiError}
            </div>
          </div>}

          <h2 className="text-4xl text-center font-bold text-[#0284c7] pb-4">Register Now🕛</h2>

          {/* Validation Inputs Same Div */}
          {formik.errors.name && formik.touched.name ? <div className="font-medium px-4 py-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {formik.errors.name}
          </div> : formik.errors.email && formik.touched.email ? <div className="font-medium px-4 py-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {formik.errors.email}
          </div> : formik.errors.password && formik.touched.password ? <div className="font-medium px-4 py-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {formik.errors.password}
          </div> : formik.errors.rePassword && formik.touched.rePassword ? <div className="font-medium px-4 py-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {formik.errors.rePassword}
          </div> : formik.errors.phone && formik.touched.phone ? <div className="font-medium px-4 py-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {formik.errors.phone}
          </div> : ''}

          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 font-medium text-[#18181b] ">Full Name</label>
            <input type="text" name='name' id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="outline-none bg-gray-50 border border-gray-300 text-[#0284c7] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter Your Name" />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block mb-2  font-medium text-[#18181b] ">Your email</label>
            <input type="email" name='email' id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="outline-none bg-gray-50 border border-gray-300 text-[#0284c7]  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@company.com" />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block mb-2  font-medium text-[#18181b] ">Password</label>
            <input type="password" name='password' id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="outline-none bg-gray-50 border border-gray-300 text-[#0284c7]  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="••••••••" />
          </div>

          <div className="mb-5">
            <label htmlFor="rePassword" className="block mb-2  font-medium text-[#18181b] dark:text-white">Confirm password</label>
            <input type="password" name='rePassword' id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="outline-none bg-gray-50 border border-gray-300 text-[#0284c7]  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="••••••••" />
          </div>

          <div className="mb-5">
            <label htmlFor="phone" className="block mb-2  font-medium text-[#18181b]">Phone</label>
            <input type="tel" name='phone' id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="outline-none bg-gray-50 border border-gray-300 text-[#0284c7]  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter Your Phone Number" />
          </div>
          {loading ? <button type="button" className=" transition text-white bg-[#0284c7] hover:bg-[#0264c7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg  w-full sm:w-[3.5cm] px-5 py-2.5 mt-4 text-center block mx-auto">
            <i className='fas fa-spinner fa-spin-pulse fa-xl'></i>
          </button>
            : <button type="submit" className=" transition text-white bg-[#0284c7] hover:bg-[#0264c7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg  w-full sm:w-[3.5cm] px-5 py-2.5 mt-4 text-center block mx-auto">Register</button>
          }

        </form>
      </div>

      <div className={`${style.image} w-1/2 p-20`}>
        <img src={registerr} className=' mr-0 mx-auto' alt="" />
      </div>
    </div>
  </>
}
