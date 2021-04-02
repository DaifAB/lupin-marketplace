import React,{useState,useEffect} from 'react'
import jwt from 'jwt-decode'
import access from '../../../src/img/access.jpg'
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
export default function Admins() {
    const classes = useStyles();
    const {register,handleSubmit} = useForm()
    const token = localStorage.getItem('token')
    const isSuperAdmin = jwt(token).superAdmin
    const [admins, setAdmins] = useState([])

    const onSubmit = async (data) =>{

     await axios.post('http://localhost:5000/admin/add',{
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        address: data.address,
     })
        .then(function (response) {
            fetchData()
            store.addNotification({
                title: "Success !",
                message: "Admin Added",
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
      await axios.get('http://localhost:5000/admin/getAll')
       .then(response =>{
           const allAdmins = response.data
           setAdmins(allAdmins)
       }).catch(error =>{
           console.log(error);
       })
   }

    async function deleteAdmin(id){
        await axios.delete('http://localhost:5000/admin/deleteAdmin/'+id)
                    .then(function(response){
                    fetchData()
                    store.addNotification({
                    title: "Success !",
                    message: "Admin Deleted",
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
        <>
            {isSuperAdmin ? (
            <div className="admins-container" >
                <h1 style={{textAlign:'center'}}>Add Admin</h1>
                <div className="add-admin-form">
                    <form className={classes.root} noValidate autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
                        <TextField name="full_name" label="Full Name" variant="outlined" inputRef={register} />
                        <TextField name="email" label="Email" variant="outlined" inputRef={register} />
                        <TextField name="phone" label="Phone" variant="outlined" inputRef={register} />
                        <TextField name="password" label="Password" type="password" variant="outlined" inputRef={register} />
                        <TextField name="address" label="Address" variant="outlined" inputRef={register} />
                        <Button variant="contained" color="primary" type="submit">Add Admin</Button>
                    </form>
                </div>
                <h1 style={{textAlign:'center'}}>Admins List</h1>
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
                        {admins.map(admin =>{
                            return <tr key={admin._id}>
                            <td>{admin.full_name}</td>
                            <td>{admin.email}</td>
                            <td>{admin.phone}</td>
                            <td>{admin.address}</td>
                            <td><button onClick={() => deleteAdmin(admin._id)}><DeleteIcon color="error"/></button></td>
                            </tr>
                            })
                        }
                        </tbody>
                    </Table>
            </div>
            ) : (
                <div className="admins-container">
                    <img src={access} alt="" />
                </div>
            )}
        </>
    )
}
