import React,{useState,useEffect} from 'react'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import { makeStyles } from '@material-ui/core/styles';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import CheckIcon from '@material-ui/icons/Check';
import jwt from 'jwt-decode'
import axios from 'axios'

const useStyles = makeStyles({
    root: {
        fontSize : '100px',
        color : 'gray'
    }
  });

export default function Stats() {
    const classes = useStyles();
    const [seller, setSeller] = useState({})
    const token = localStorage.getItem('token')
    const seller_id = jwt(token)._id

    useEffect(() => {
      getSeller()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const getSeller = async () => {
        await axios.get('http://localhost:5000/seller/getOne/'+seller_id)
                   .then( response =>{
                     setSeller(response.data)
                   })
                   .catch(error =>{
                     console.log(error);
                   })
    }

    return (
        <div className="statistics-container">
            <h1>
                MY STATISTICS
            </h1>
            <div className="flex flex-col md:flex-row justify-center">
            <div className="md:w-11/12">
              <div className="flex md:flex-row space-x-8">
                <div className="shadow-md p-4">
                  <div>
                    <div className="flex flex-col">
                      <div className="flex space-x-8 w-56">
                        <div>
                          <div className="uppercase text-sm text-gray-400">
                            Turn over <br/> <br/>
                          </div>
                          <div className="mt-1">
                            <div className="flex space-x-2 items-center">
                              <div className="text-2xl text-green-800 rounded-md p-1">
                                {seller.turnOver} $
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <MonetizationOnIcon  classes={{root: classes.root }}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shadow-md p-4">
                  <div>
                    <div className="flex flex-col">
                      <div className="flex space-x-8 w-56">
                        <div>
                          <div className="uppercase text-sm text-gray-400">
                            Products count 
                          </div>
                          <div className="mt-1">
                            <div className="flex space-x-2 items-center">
                              <div className="text-2xl text-green-800 rounded-md p-1">
                              {seller.productsCount}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <LocalParkingIcon  classes={{root: classes.root }}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shadow-md p-4">
                  <div>
                    <div className="flex flex-col">
                      <div className="flex space-x-8 w-56">
                        <div>
                          <div className="uppercase text-sm text-gray-400">
                            Pack Type <br/> <br/>
                          </div>
                          <div className="mt-1">
                            <div className="flex space-x-2 items-center">
                              <div className="text-2xl text-green-800 rounded-md p-1">
                              {seller.type}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                        <AllInboxIcon  classes={{root: classes.root }}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shadow-md p-4">
                  <div>
                    <div className="flex flex-col">
                      <div className="flex space-x-8 w-56">
                        <div>
                          <div className="uppercase text-sm text-gray-400">
                            Account Validation 
                          </div>
                          <div className="mt-1">
                            <div className="flex space-x-2 items-center">
                              {seller.isValid ? (
                                <div className="text-2xl text-green-800 bg-green-200 rounded-md p-1">
                                yes
                              </div>
                              ) : (
                                <div className="text-2xl text-green-800 bg-red-200 rounded-md p-1">
                                No
                              </div>
                              )
                              }

                            </div>
                          </div>
                        </div>
                        <div>
                          <CheckIcon classes={{root: classes.root }}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
    )
}
