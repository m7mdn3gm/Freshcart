import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export let WishListContext = createContext();

export default function WishListContextProvider({ children }) {

    const [wishList, setWishList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [wishlistCheck, setWishlistCheck] = useState([]); // check


    async function getWishList() {
        try {
            setLoading(true);
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                headers: {
                    token: localStorage.getItem('userToken'),
                }
            });
            console.log(data);
            setWishList(data);
            setWishlistCheck(data.data.map((item) => item.id)) // check
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    async function addProductToWishList(productId) {
        try {
            setLoading(true);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                productId
            }, {
                headers: {
                    token: localStorage.getItem('userToken')
                }
            });
            console.log(data);
            setWishList(data);
            setWishlistCheck(data.data);
            toast.success('Added To Fav', {
                iconTheme: {
                    primary: '#FA812F',
                    secondary: '#fff',
                },
                style: {
                    background: '#FA4032',
                    color: '#FEF3E2'
                },
            });
            setLoading(false);
        } catch (err) {
            console.log(err);
            setWishlistCheck(data.data);
            setLoading(false);
        }
    }

    async function removeProduct(productId) {
        try {
            setLoading(true);
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
                headers: {
                    token: localStorage.getItem('userToken')
                }
            });
            console.log(data);
            setWishList(data);
            setWishlistCheck(data.data);
            toast.success('Remove From Fav', {
                iconTheme: {
                    primary: '#FA812F',
                    secondary: '#fff',
                },
                style: {
                    background: '#FA4032',
                    color: '#FEF3E2'
                },
            });
            setLoading(false);
        } catch (err) {
            console.log(err);
            setWishlistCheck(0);
            setLoading(false);
        }
    }

    useEffect(() => {
        getWishList();
    }, []);

    return <WishListContext.Provider value={{ wishlistCheck , addProductToWishList, getWishList, wishList, loading, removeProduct }}>
        {children}
    </WishListContext.Provider>
}