import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './ProductDetails.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import Loading from '../Loading/Loading'
import { CartContext } from '../../Context/CartContext'
import RelatedProducts from '../RelatedProducts/RelatedProducts'
import { WishListContext } from '../../Context/WishListContext'


export default function ProductDetails() {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  

  let { addProductToCart } = useContext(CartContext);
  let { wishlistCheck , removeProduct , addProductToWishList } = useContext(WishListContext);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  let { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  // related
  const [relatedProducts, setRelatedProducts] = useState([]);

  async function getProductDetails() {
    setLoading(true);
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    console.log(data.data);
    setProductDetails(data.data);
    getRelatedProducts(data.data?.category._id);
    setLoading(false);
  }
  useEffect(() => {
    getProductDetails();
  }, []);

  async function getRelatedProducts(categoryId) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
      params: {
        category: categoryId
      }
    });
    setRelatedProducts(data.data);
  }


  return <>
        <button onClick={()=> scrollToTop() }><i className="fa-solid fa-arrow-up fixed z-50 bottom-3 right-3 rounded cursor-pointer bg-[#0284c7] text-white p-2 text-[20px]"></i></button>

    {loading ? <div className="flex justify-center items-center py-20 mt-10">
      <Loading />
    </div> : <div className="boxs-productdetails flex justify-center items-center gap-8 my-10">
      <div className="box-productdetails w-[7cm] relative">
      <Slider {...settings}>
          {productDetails.images?.map((image, index) => <img key={index} src={image} className='shadow border cursor-pointer' alt="" />
          )}
        </Slider>
        <p className='category-product absolute text-[15px] opacity-70 bg-[#0284c7] top-2 left-2  p-1 text-[#fff] font-medium rounded-sm'>{productDetails.brand?.name}</p>
        <button onClick={()=> { wishlistCheck.some((i) => i === productDetails.id) ? removeProduct(productDetails.id) : addProductToWishList(productDetails.id)} } className=' absolute text-[23px] p-1 top-0 cursor-pointer right-2  font-medium' ><i className={`fa-solid fa-heart ${wishlistCheck.some((i) => i == productDetails.id) ? "text-red-500 " : "text-[#777]"}`} ></i></button>

      </div>
      <div className="box-productdetails w-3/4">
        <h2 className='mb-4 text-[#0284c7] font-bold text-xl'>{productDetails.title}</h2>
        <p className='text-gray-500'>{productDetails.description}</p>
        <h3 className='my-4 font-medium'>{productDetails.category?.name}</h3>
        <div className="price font-medium flex justify-between items-center">
          <h3>{productDetails.price} EGP</h3>
          <h3 className='flex justify-center items-center gap-1'> <i className="fa-solid fa-star text-[#fdcc0d] text-sm"></i> {productDetails.ratingsAverage} </h3>
        </div>
        <button onClick={() => addProductToCart(productDetails.id)} className='btn border-none w-full mt-4'>Add To Cart <i className="fa-brands fa-shopify"></i> </button>
      </div>
    </div>}

    <div className="mt-[3cm]">
      <RelatedProducts products={relatedProducts} />
    </div>





  </>
}
