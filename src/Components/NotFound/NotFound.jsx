import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import style from './NotFound.module.css'
import err from '../../assets/images/error.png'

export default function NotFound() {
    function scrollTotop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
    scrollTotop()
  return <>
  <img src={err} className='w-[15cm] mx-auto' alt="" />
  </>
}
