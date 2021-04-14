import { Button, makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import { store } from 'react-notifications-component';
import { useForm } from 'react-hook-form'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(2),
        width: '35ch',
      },
    },
  }));

export default function AuctionProduct() {
    const classes = useStyles();
    const {register,handleSubmit} = useForm()
    const db = firebase.firestore();
    const onSubmit = async (data,e) =>{
        e.preventDefault();

        console.log(data);

        if (db) {

              db.collection("products").add({
                name: data.name,
                image: data.img,
                price: data.price,
                description: data.desc,
                endDate : data.endDate,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              }).then(()=> {
                store.addNotification({
                    title: "Success !",
                    message: "Product Added",
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
          }
       }
    return (
        <div className="admins-container" >
            <h1 style={{textAlign:'center'}}>Add Product to Auction</h1>
            <div className="add-admin-form">
                <form className={classes.root} noValidate autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
                    <TextField name="name" label="Product Name" variant="outlined" inputRef={register} />
                    <TextField name="price" label="Price" type="number" variant="outlined" inputRef={register} />
                    <TextField name="desc" label="Description" variant="outlined" inputRef={register} />
                    <TextField name="img" label="Image Link" variant="outlined" inputRef={register} />
                    <TextField name="endDate"  type="datetime-local" variant="outlined" inputRef={register} />
                    <Button variant="contained" color="primary" type="submit">Add Product</Button>
                </form>
            </div>
        </div>
    )
}
