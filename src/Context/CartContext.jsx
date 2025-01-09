import React, { useEffect, useState } from 'react';
import axios from "axios";
import { createContext } from "react";
import toast from 'react-hot-toast';

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);

    async function addProductToCart(productId) {
        try {
            setLoading(true);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
                productId
            }, {
                headers: {
                    token: localStorage.getItem('userToken')
                }
            });
            console.log(data);
            toast.success(data.message, {
                iconTheme: {
                    primary: '#27272a',
                    secondary: '#fff',
                },
                style: {
                    background: '#0284c7',
                    color: '#fff'
                },
            });
            setCart(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    async function updateProductCount(productId, count) {
        if (count > 0) {
            try {
                setLoading(true);
                let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                    count
                }, {
                    headers: {
                        token: localStorage.getItem('userToken')
                    }
                });
                console.log(data);
                setCart(data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        } else {
            deleteProductItem(productId);
        }
    }

    async function deleteProductItem(productId) {
        try {
            setLoading(true);
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                headers: {
                    token: localStorage.getItem('userToken')
                }
            });
            console.log(data);
            setCart(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    async function clearCart() {
        try {
            setLoading(true);
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers: {
                    token: localStorage.getItem('userToken')
                }
            });
            console.log(data);
            setCart(null);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    async function checkout(shippingAddress) {
        try {
            setLoading(true);
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=http://localhost:5175` , {
                shippingAddress
            } , {
                headers: {
                    token : localStorage.getItem('userToken')
                }
            })
            console.log(data);
            window.location.href = data.session.url
            setLoading(true);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    async function getCart() {
        try {
            setLoading(true);
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers: {
                    token: localStorage.getItem('userToken'),
                }
            });
            console.log(data);
            setCart(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    useEffect(()=>{
        getCart();
    } , [])

    return <CartContext.Provider value={{checkout , clearCart , deleteProductItem, loading, updateProductCount, addProductToCart, getCart, cart, setCart }}>
        {children}
    </CartContext.Provider>

    
}
