import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Route } from 'react-router-dom';
import jwt from 'jwt-decode'
import Login from './Login'
import Signup from './Signup';
import ResetPassword from './ResetPassword';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 20,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

export default function Home({history}) {
    const classes = useStyles();
    const token = localStorage.getItem('token')

    let role
    let decodedToken

    if(token) { role = jwt(token).role; decodedToken = jwt(token) }

    console.log(decodedToken);
    
    

    const logOut = () => {
        localStorage.removeItem("token");
        history.push('/Home')
    }

  return (
    <div className={classes.root}>
      <AppBar position="static"  style={{ background: '#1a1a1a' , height : '100px' , justifyContent : 'center' }}>
        <Toolbar>

          <Typography variant="h4" className={classes.title}>
            BENJAMIN MARKETPLACE
          </Typography>
            {token ? (
                <>
                {role === 'seller' ? (
                    <Button color="inherit" href="/Seller/Dashboard">DASHBOARD</Button>
                ) : (<></>)
                }
                <Button color="inherit" onClick={logOut}>LOG OUT</Button>
                </>
            ) : (
                <Button color="inherit" href="/Login">SIGN IN</Button>
            )
            }
        </Toolbar>
      </AppBar>
      <Route path="/Login" exact component={Login}/>
      <Route path="/Signup" exact component={Signup}/>
      <Route path="/ResetPassword" exact component={ResetPassword}/>


    </div>
  );
}
