import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import style from './Loading.module.css'
import { CirclesWithBar } from 'react-loader-spinner'

export default function Loading() {

  return <>
    <CirclesWithBar
      height="80"
      width="80"
      color="#0284c7"
      outerCircleColor="#0284c7"
      innerCircleColor="#0284c7"
      barColor="#0284c7"
      ariaLabel="circles-with-bar-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  </>
}
