import React, { useEffect, useState } from 'react'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link} from 'react-router-dom'
import axios from 'axios'
import { IconButton, makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(2),
        width: '35ch',
      },
    },
  }));


export default function MarketPlace() {
    const [products, setProducts] = useState([])
    const classes = useStyles();
    const [page,setPage] = useState(1)
    const [devise , setDevise] = useState(0)
    const currency = localStorage.getItem('devise')

    const getDevise = async () =>{

        await axios.get('http://data.fixer.io/api/latest?access_key=4f5525326e240bf147fc0c19db68f087')
                   .then(response => {
                       console.log(response.data.rates);
                       if(currency){
                           setDevise(response.data.rates[currency])
                       }else{
                           setDevise(response.data.rates.USD)
                       }
                   })
                   .catch(err => {
                       console.log(err);
                   })
    }



    const next = () => {
        setPage(page+1)
        getProducts(page)
    }
    const prev = () => {
        if(page !== 1){
            setPage(page-1)
            getProducts(page)
        }
    }

    async function getProducts(page) {
        await axios.get(`http://localhost:5000/product/getProducts/?page=${page}&limit=6`)
         .then(response =>{
             const allProducts = response.data
             setProducts(allProducts)
         }).catch(error =>{
             console.log(error);
         })
     }

     useEffect(() => {
        getProducts(page)
        getDevise()
    }, [page]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className="fluid-container products-container">
            <div className="all-products">
                {
                    products.map(product =>{
                return  <div className="flex flex-col justify-between w-72 sm:w-96 h-96 bg-white bg-center text-gray-800 shadow-md overflow-hidden cursor-pointer mt-5" style={{backgroundImage: 'url(/uploads/' + product.picture + ')'}} key={product._id}>
                            <div className="flex justify-between items-center ml-4 pr-8">
                                <Link to={`/Product/${product._id}`} >
                                  <div className="bg-red-600 text-white bg-opacity-95 shadow px-2 py-1 flex items-center font-bold text-xs rounded">More informations</div>
                                </Link>
                            <div className="bg-red-600 w-10 h-12 shadow flex flex-col-reverse p-2 text-center font-bold text-white rounded-b-full">%</div>
                            </div>
                            <div className="bg-white bg-opacity-95 shadow-md rounded-r-xl p-4 flex flex-col mr-4 mb-8">
                            <h3 className="text-xl font-bold pb-2">{product.name}</h3>
                            <p className="truncate text-gray-500 text-sm">{product.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-xs">{Number(product.price*devise).toFixed(2)}
                                {
                                    currency === 'USD' ? (
                                         <span>$</span>
                                    ) : (
                                        <span>€</span>
                                    )
                                }
                                </span>
                            </div>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className="pagination mt-5 mb-5" style={{width : '70%'}}>
            <IconButton aria-label="delete" className={classes.margin} size="small" onClick={prev}>
            <ArrowBackIosIcon fontSize="inherit" />
            </IconButton>
            <p>Page : {page}</p>
            <IconButton aria-label="delete" className={classes.margin} size="small" onClick={next}>
            <ArrowForwardIosIcon fontSize="inherit" />
            </IconButton>
            </div>


        </div>
    )
}
