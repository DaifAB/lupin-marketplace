import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { store } from 'react-notifications-component';
import Table from 'react-bootstrap/Table'
import DeleteIcon from '@material-ui/icons/Delete';



const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(2),
        width: '35ch',
      },
    },
  }));
export default function DeliveryMen() {

    const classes = useStyles();
    const {register,handleSubmit} = useForm()
    const [deliveryMen, setDeliveryMen] = useState([])

    const onSubmit = async (data) =>{

     await axios.post('http://localhost:5000/DeliveryMan/add',{
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        address: data.address,
     })
        .then(function (response) {
            fetchData()
            store.addNotification({
                title: "Success !",
                message: "Delivery Man Added",
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
            console.log(error);
    })
    }

    useEffect(() => {
        fetchData()
    }, [])

   async function fetchData() {
      await axios.get('http://localhost:5000/deliveryMan/getAll')
       .then(response =>{
           const allDeliveryMen = response.data
           setDeliveryMen(allDeliveryMen)
       }).catch(error =>{
           console.log(error);
       })
   }

    async function deleteDeliveryMan(id){
        await axios.delete('http://localhost:5000/deliveryMan/delete/'+id)
                    .then(function(response){
                    fetchData()
                    store.addNotification({
                    title: "Success !",
                    message: "Delivery Man Deleted",
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

            <div className="admins-container" >
                <h1 style={{textAlign:'center'}}>Add Admin</h1>
                <div className="add-admin-form">
                    <form className={classes.root} noValidate autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
                        <TextField name="full_name" label="Full Name" variant="outlined" inputRef={register} />
                        <TextField name="email" label="Email" variant="outlined" inputRef={register} />
                        <TextField name="phone" label="Phone" variant="outlined" inputRef={register} />
                        <TextField name="address" label="Address" variant="outlined" inputRef={register} />
                        <Button variant="contained" color="primary" type="submit">Add Delivery Man</Button>
                    </form>
                </div>
                <h1 style={{textAlign:'center'}}>Delivery Men List</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Full name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {deliveryMen.map(deliveryMan =>{
                            return <tr key={deliveryMan._id}>
                            <td>{deliveryMan.full_name}</td>
                            <td>{deliveryMan.email}</td>
                            <td>{deliveryMan.phone}</td>
                            <td>{deliveryMan.address}</td>
                            <td><button onClick={() => deleteDeliveryMan(deliveryMan._id)}><DeleteIcon color="error"/></button></td>
                            </tr>
                            })
                        }
                        </tbody>
                    </Table>
            </div>
    )
}
