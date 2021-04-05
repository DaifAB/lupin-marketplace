import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { store } from 'react-notifications-component';
import Table from 'react-bootstrap/Table'
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(2),
        width: '35ch',
      },
    },
  }));

export default function Ads() {
    const classes = useStyles();
    const {register,handleSubmit} = useForm()
    const [ads, setAds] = useState([])

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

    const onSubmit = async (data) =>{
        const formAds = new FormData();
        formAds.append("picture", data.picture[0]);
        formAds.append("pricing", data.pricing);
        formAds.append("startDate", data.startDate);
        formAds.append("endDate", data.endDate);
     await axios.post('http://localhost:5000/ads/add',formAds)
        .then(function (response) {
            fetchData()
            store.addNotification({
                title: "Success !",
                message: "Ad Added",
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
        fetchData(page)
    }, [page])

   async function fetchData(page) {
      await axios.get(`http://localhost:5000/ads/get/?page=${page}&limit=2`)
       .then(response =>{
           const allAds = response.data
           setAds(allAds)
       }).catch(error =>{
           console.log(error);
       })
   }

   async function deleteAd(id){
        await axios.delete('http://localhost:5000/ads/delete/'+id)
        .then(function(response){
        fetchData(page)
        store.addNotification({
        title: "Success !",
        message: "Ad Deleted",
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
                    <TextField name="pricing" label="Price" variant="outlined" type="number"inputRef={register} />
                    <TextField name="picture" label="Ads Picture" type="file"  InputLabelProps={{shrink: true}} variant="outlined" inputRef={register}/>
                    <TextField name="startDate" label="Date Start"  type="date" InputLabelProps={{shrink: true}} variant="outlined" inputRef={register}/>
                    <TextField name="endDate" label="Date End" type="date" InputLabelProps={{shrink: true}} variant="outlined" inputRef={register}/>
                    <Button variant="contained" color="primary" type="submit">Add Ads</Button>
                </form>
            </div>
            <h1 style={{textAlign:'center'}}>Ads List</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Picture</th>
                    <th>Price</th>
                    <th>Date Start</th>
                    <th>Date End</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {ads.map(ad =>{
                      return <tr key={ad._id}>
                      <td align="center"><img alt="" src={`/uploads/${ad.picture}`}/></td>
                      <td>{ad.pricing}</td>
                      <td>{ad.startDate}</td>
                      <td>{ad.endDate}</td>
                      <td><button onClick={() => deleteAd(ad._id)}><DeleteIcon color="error"/></button></td>
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