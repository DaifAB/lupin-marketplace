import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(2),
        width: '35ch',
      },
    },
  }));

export default function Orders() {
    const classes = useStyles();
    const [orders, setOrders] = useState([])
    const [page,setPage] = useState(1)

    const next = () => {
        setPage(page+1)
        fetchData(page)
    }
    const prev = () => {
        if(page !== 1){
            setPage(page-1)
            fetchData(page)
        }
    }


          useEffect(() => {
              fetchData(page)// eslint-disable-next-line 
          }, [page])

          function fetchData() {
              axios.get(`http://localhost:5000/order/get?page=${page}&limit=5`)
             .then(response =>{
                 const allOrders = response.data
                 console.table(allOrders);
                 setOrders(allOrders)
                 console.table(allOrders);
             }).catch(error =>{
                 console.log(error);
             })
         }


    return (
        <div className="seller-container">
            <h1>Orders</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Product</th>
                    <th>Seller</th>
                    <th>Buyer</th>
                    <th>Total Price</th>
                    <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                {orders.map(order =>{
                      return <tr key={order._id}>
                      <td>{order.id_product}</td>
                      <td>{order.id_seller}</td>
                      <td>{order.id_buyer}</td>
                      <td>{order.totalPrice}</td>
                      <td>{order.address}</td>
                    </tr>
                    })
                  }

                </tbody>
            </Table>
            <div className="pagination">
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
