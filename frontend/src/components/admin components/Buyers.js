import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { store } from 'react-notifications-component';
import Table from 'react-bootstrap/Table'
import DeleteIcon from '@material-ui/icons/Delete';


export default function Buyers() {

    const [buyers, setBuyers] = useState([])


          useEffect(() => {
              fetchData()
          }, [])

          function fetchData() {
              axios.get('http://localhost:5000/buyer/getAll')
             .then(response =>{
                 const allBuyers = response.data
                 setBuyers(allBuyers)
                 console.table(allBuyers);
             }).catch(error =>{
                 console.log(error);
             })
         }



async function deleteBuyer(id){
    await axios.delete('http://localhost:5000/buyer/delete/'+id)
               .then(function(response){
                fetchData()
                store.addNotification({
                  title: "Success !",
                  message: "Buyer Deleted",
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
            <h1>Buyers</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {buyers.map(buyer =>{
                      return <tr key={buyer._id}>
                      <td>{buyer.full_name}</td>
                      <td>{buyer.email}</td>
                      <td>{buyer.phone}</td>
                      <td><button onClick={() => deleteBuyer(buyer._id)}><DeleteIcon color="error"/></button></td>
                    </tr>
                    })
                  }

                </tbody>
            </Table>
                </div>

    )
}
