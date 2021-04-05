import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { store } from 'react-notifications-component';
import Table from 'react-bootstrap/Table'
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, makeStyles } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: '35ch',
    },
  },
}));

export default function Sellers() {
    const classes = useStyles();
    const [sellers, setSellers] = useState([])
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
              fetchData(page)
          }, [page])

          function fetchData(page) {
              axios.get(`http://localhost:5000/seller/get/?page=${page}&limit=2`)
             .then(response =>{
                 const allSellers = response.data
                 setSellers(allSellers)
                 console.table(allSellers);
             }).catch(error =>{
                 console.log(error);
             })
         }

async function validateSeller(id) {

    const token = localStorage.getItem('token')
    console.log(token);
    axios.patch('http://localhost:5000/seller/validate',{
        id_seller : id,
    },{
        headers:{
            "auth-token": token
          }
    })
    .then(function (response) {
        fetchData(page)
        store.addNotification({
            title: "Success !",
            message: "Seller account validated",
            type: "success",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
      })
      .catch(function (error) {
         store.addNotification({
            title: "Error !",
            message: error.response.data,
            type: "danger",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
        console.log(error.response.data);
      });

     
}

async function deleteSeller(id){
    await axios.delete('http://localhost:5000/seller/delete/'+id)
               .then(function(response){
                fetchData(page)
                store.addNotification({
                  title: "Success !",
                  message: "Seller Deleted",
                  type: "success",
                  insert: "top",
                  container: "bottom-right",
                  animationIn: ["animate__animated", "animate__fadeIn"],
                  animationOut: ["animate__animated", "animate__fadeOut"],
                  dismiss: {
                    duration: 5000,
                    onScreen: true
                  }
                });
               })
               .catch(function(error){
                 console.log(error);
               })
}


    return (
        <div className="seller-container">
            <h1>Sellers</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Full Name</th>
                    <th>Fiscal identity</th>
                    <th>Phone</th>
                    <th>Valid ?</th>
                    <th>Validate</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {sellers.map(seller =>{
                      return <tr key={seller._id}>
                      <td>{seller.full_name}</td>
                      <td>{seller.identity}</td>
                      <td>{seller.phone}</td>
                      {seller.isValid ? <td>Yes</td> : <td>No</td> }
                      <td><button onClick={() => validateSeller(seller._id)}><CheckIcon color="primary"/></button></td>
                      <td><button onClick={() => deleteSeller(seller._id)}><DeleteIcon color="error"/></button></td>
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
