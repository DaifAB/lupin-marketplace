import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel'

export default function AdsCarousel(){
    const [ads, setAds] = useState([])

    async function fetchData() {
        await axios.get(`http://localhost:5000/ads/getAll/`)
         .then(response =>{
             const allAds = response.data
             setAds(allAds)
         }).catch(error =>{
             console.log(error);
         })
     }


 useEffect(() => {
        fetchData()
    }, [])
    return (
        <Carousel>
            {
                ads.map(ad => {
                    return <div className="carousel-ads-container" key={ad._id}>
                        <img alt="" src={`/uploads/${ad.picture}`}/>
                    </div>
                })
            }
        </Carousel>
    )
}
