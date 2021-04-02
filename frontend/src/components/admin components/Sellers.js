import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { store } from 'react-notifications-component';
import Table from 'react-bootstrap/Table'
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';


export default function Sellers() {

    const [sellers, setSellers] = useState([])


          useEffect(() => {
              fetchData()
          }, [])

          function fetchData() {
              axios.get('http://localhost:5000/seller/getAll')
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
        fetchData()
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
                fetchData()
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
                </div>

    )
}
