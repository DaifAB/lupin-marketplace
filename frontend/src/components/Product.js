import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BuyProduct from './BuyProduct'
import jwt from 'jwt-decode'

export default function Product({match}) {
    const product_id = match.params.id 
    const [product, setProduct] = useState({})
    const token = localStorage.getItem('token')
    let id_buyer;
    let buyer_address;
    let role;

    if (token) {
         id_buyer = jwt(localStorage.getItem('token'))._id
         buyer_address = jwt(localStorage.getItem('token')).address
         role = jwt(token).role
    }

    const getProduct = async (product_id) => {
        await axios.get('http://localhost:5000/product/getProductById/'+product_id)
                   .then(response =>{
                       setProduct(response.data)
                   })
                   .catch(err => {
                       console.log(err);
                   })
    }

    const addOrder = async () => {
        await axios.post('http://localhost:5000/order/add',{
            id_product: product._id,
            id_seller: product.id_seller,
            id_buyer: id_buyer,
            totalPrice: product.price,
            address:buyer_address
        },{
            headers : {
                'auth-token' : token
            }
        }).then(resp => {
            console.log(resp);
        }).catch(err =>{
            console.log(err.response.data);
        })

        await axios
            .patch("http://localhost:5000/seller/updateTurnOver/" + product.id_seller, {
                turnOver: product.price
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
        await axios
            .delete("http://localhost:5000/product/deleteProduct/" + product_id)
            .then((res) => console.log(res))
            .catch((err) => console.log(err.response));
    }

    useEffect(() => {
        getProduct( product_id )
    }, [ product_id ])
    return (
        <div>
            <section className="text-gray-700 body-font overflow-hidden bg-white">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={`/uploads/${product.picture}`} />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">LUX PRODUCT</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>
                        <div className="flex mb-4">
                        <span className="flex items-center">
                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </span>
                        </div>
                        <p className="leading-relaxed">{product.description}</p>
                        <div className="flex">
                        <span className="title-font font-medium text-2xl text-gray-900">{product.price} $</span>
                        
                        </div>
                        {
                            role === 'buyer' ? (
                                <BuyProduct totalPrice={product.price} addOrder={addOrder} />
                            ) : (
                                <h4 className="mt-5">Please login as a buyer <br /> if you want to buy</h4>
                            )
                        }
                    </div>
                    </div>
                </div>
                </section>

        </div>
    )
}
