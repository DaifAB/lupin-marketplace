import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import userImg from '../img/bussiness-man.png'
import jwt from 'jwt-decode'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import axios from 'axios'
import Countdown from 'react-countdown'


export default function Auction() {
    const [product, setProduct] = useState([{}])
    const [newPrice, setNewPrice] =  useState(0)
    const [buyer, setBuyer] = useState({});
    const [messages, setMessages] = useState([]);
    const [buyerPrice, setBuyerPrice] = useState({})
    const [message, setMessage] = useState("")
    const [isCompleted , setIsCompleted] = useState(false)
    const buyer_name = jwt(localStorage.getItem('token')).full_name
    const buyer_id = jwt(localStorage.getItem('token'))._id
    const db = firebase.firestore();



    let lastMaxPrice = 0

    if(buyerPrice[0]){
      lastMaxPrice = buyerPrice[0].BuyerPrice
    }

    const getBuyer = (id) => {
        axios
          .get("http://localhost:5000/buyer/getBuyer/" + id)
          .then((response) => {
            setBuyer(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const onSubmitHandler = (e) => {
        e.preventDefault();
    
        if (db) {
          if (message === "") {
            console.log("add message")
          } else {
            db.collection("messages").add({
              text: message,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              buyer: buyer.full_name,
            });
          }
    
          setMessage("");
        }
      };


      const saveBuyerPrice = async (e) => {
        e.preventDefault();
        if (newPrice <= lastMaxPrice) {
          alert('please insert a higher price')
        } else {
          if (db) {
            db.collection("auctionWinner").add({
              full_name: buyer.full_name,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              BuyerPrice: newPrice,
            });
          }
        }
      };

      useEffect(() => {
        getBuyer(buyer_id);

        if (db) {
          // eslint-disable-next-line
          const data = db
            .collection("products")
            .limit(1)
            .onSnapshot((querySnapshot) => {
              const data = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }));

              setProduct(data);
            });
            // eslint-disable-next-line
          const allMessages = db
            .collection("messages")
            .orderBy("createdAt")
            .limit(100)
            .onSnapshot((querySnapshot) => {
              const data = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }));
              setMessages(data);
            });
                // eslint-disable-next-line
                const maxPrice = db
                  .collection("auctionWinner")
                  .orderBy("createdAt", "desc")
                  .limit(1)
                  .onSnapshot((querySnapshot) => {
                    const dataPrice = querySnapshot.docs.map((doc) => ({
                      ...doc.data(),
                      id: doc.id,
                    }));

                    setBuyerPrice(dataPrice);
                  });

        }


      }, [db,buyer_id,buyerPrice]);
    return (
        <div className="container mt-5 mb-5">
            <div className="row d-flex justify-content-center mt-5 mb-3">
              <span style={{color : 'red', fontSize : '50px'}}>
                { product[0].endDate ? (<Countdown date={Date.parse(product[0].endDate) +10000} onComplete={() => {setIsCompleted(true)}}/>) : (<></>)}
              </span>
            </div>
            <div className="row">
                <div className="col-md-7 d-flex flex-column align-items-center justify-content-around p-5"  style={{height : "800px", WebkitBoxShadow: " 0px 0px 37px -6px rgba(0,0,0,0.75)",MozBoxShadow: " 0px 0px 37px -6px rgba(0,0,0,0.75)",boxShadow: " 0px 0px 37px -6px rgba(0,0,0,0.75)"}}>
                  {isCompleted ? (
                    <h1>Product is sold to {buyerPrice[0].full_name}</h1>
                  ) : (<>
                        <h3>{product[0].name}</h3>
                        <img src={product[0].image} alt="productImg"/>

                        <h4 className="mb-3 mt-3">{product[0].price} $</h4>
                        <h4 className="mb-3" style={{color : "green"}}>{lastMaxPrice} $</h4>
                        <p>{product[0].description}</p>
                        <div className="d-flex flex-row">
                        <TextField name="newPrice" label="Your Price" variant="outlined" type="number" style={{marginRight : "30px"}} onChange={e => {setNewPrice(e.target.value)}}/>
                        <Button variant="contained" color="primary" type="submit" onClick={saveBuyerPrice}>Increase !</Button>
                        </div>
                        </>
                  )}
                </div>
                <div className="col-md-5" >
                <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col" style={{height : "800px", WebkitBoxShadow: " 0px 0px 37px -6px rgba(0,0,0,0.75)",MozBoxShadow: " 0px 0px 37px -6px rgba(0,0,0,0.75)",boxShadow: " 0px 0px 37px -6px rgba(0,0,0,0.75)"}} >
                    <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                        <div className="flex items-center space-x-4">
                        <img src={userImg} alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
                        <div className="flex flex-col leading-tight">
                            <div className="text-2xl mt-1 flex items-center">
                            <span className="text-gray-700 mr-3">{buyer_name}</span>
                            <span className="text-green-500">
                                <svg width={10} height={10}>
                                <circle cx={5} cy={5} r={5} fill="currentColor" />
                                </svg>
                            </span>
                            </div>
                            <span className="text-lg text-gray-600">Buyer at Benjamin Marketplace</span>
                        </div>
                        </div>
                    </div>
                    <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                        {
                            messages.map(message => {
                                return  <div className="chat-message" key={message.id}>
                                            <div className="flex items-end">
                                                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                                <div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">{message.text}</span></div>
                                                </div>
                                                <span className="flex items-center justify-center h-10 w-10 rounded-full bg-black text-white flex-shrink-0">{message.buyer.charAt(0)}</span>
                                            </div>
                                        </div>
                            })
                        }
                        
                    </div>
                    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                        <div className="relative flex">
                        <span className="absolute inset-y-0 flex items-center">
                        </span>
                        <input type="text" placeholder="Write Something" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3" value={message} onChange={e => {setMessage(e.target.value)}} />
                        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                            <button type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-black hover:bg-blue-400 focus:outline-none" onClick={onSubmitHandler}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 transform rotate-90">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
