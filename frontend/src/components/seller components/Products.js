import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { store } from 'react-notifications-component';
import Table from 'react-bootstrap/Table'
import DeleteIcon from '@material-ui/icons/Delete';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(2),
        width: '35ch',
      },
    },
  }));

export default function Products() {
    const classes = useStyles();
    const {register,handleSubmit} = useForm()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])

    const onSubmit = async (data) =>{
        console.log(data);
    //     const token = localStorage.getItem('token')
    //     const formProduct = new FormData();
    //     formProduct.append("picture", data.picture[0]);
    //     formProduct.append("description", data.description);
    //     formProduct.append("price", data.price);
    //     formProduct.append("name", data.name);
    //     formProduct.append("id_category", data.id_category);

    //  await axios.post('http://localhost:5000/product/addProduct',formProduct,{
    //      headers : {
    //          "auth-token" : token
    //      }
    //  })
    //     .then(function (response) {
    //         getProducts()
    //         store.addNotification({
    //             title: "Success !",
    //             message: "Product Added",
    //             type: "success",
    //             insert: "top",
    //             container: "bottom-right",
    //             animationIn: ["animate__animated", "animate__fadeIn"],
    //             animationOut: ["animate__animated", "animate__fadeOut"],
    //             dismiss: {
    //                 duration: 5000,
    //                 onScreen: true
    //             }
    //             });

    //       })
    //       .catch(function (error) {
    //         console.log(error);
    // })
    }

    useEffect(() => {
        getProducts()
        getCategories()
    }, [])

   async function getProducts() {
      await axios.get('http://localhost:5000/product/getAll')
       .then(response =>{
           const allProducts = response.data
           setProducts(allProducts)
       }).catch(error =>{
           console.log(error);
       })
   }

   async function getCategories(){
       await axios.get('http://localhost:5000/category/getAll')
                  .then(response =>{
                      setCategories(response.data)
                  })
                  .catch(err=>{
                      console.log(err);
                  })
   }

   async function deleteProduct(id){
        await axios.delete('http://localhost:5000/product/delete/'+id)
        .then(function(response){
        getProducts()
        store.addNotification({
        title: "Success !",
        message: "Product Deleted",
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
        <div className="ads-container">
        <h1 style={{textAlign:'center'}}>Add Ads</h1>
        <div className="add-ads-form">
            <form className={classes.root} noValidate autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
                <TextField name="name" label="Name" variant="outlined" inputRef={register} />
                <TextField name="picture" label="Product Picture" type="file"  InputLabelProps={{shrink: true}} variant="outlined" inputRef={register}/>
                <TextField name="description" label="Description"   variant="outlined" inputRef={register}/>
                <TextField name="price" label="Price" type="number" variant="outlined" inputRef={register}/>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    inputRef={register}
                    label="Category"
                    name="id_category"
                    >
                    {
                        categories.map(category=>{
                           return <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                        })
                    }


                    </Select>
                </FormControl>
                <Button variant="contained"  type="submit" style={{backgroundColor: '#1a1a1a' , color : 'white'}}>Add Product</Button>
            </form>
        </div>
        <h1 style={{textAlign:'center'}}>Ads List</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Picture</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {products.map(product =>{
                  return <tr key={product._id}>
                  <td><img alt="" src={`/uploads/${product.picture}`}/></td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td><button onClick={() => deleteProduct(product._id)}><DeleteIcon color="error"/></button></td>
                </tr>
                })
              }
            </tbody>
        </Table>
    </div>
    )
}
