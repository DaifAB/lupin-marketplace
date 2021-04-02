import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import { useHistory} from "react-router-dom";
import { store } from 'react-notifications-component';
import jwt from 'jwt-decode'
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#1a1a1a',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#1a1a1a'
  },
}));

export default function Login() {
  let history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState('buyer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onClick = async () =>{
    if (value === 'seller') {
    await axios.post('http://localhost:5000/seller/login',{
        email  : email,
        password : password
    })
    .then(function (response) {
      const token = response.data
      const isReseted = jwt(token).isReseted
      localStorage.setItem('token', token)

      if (isReseted) {
        history.push('/Home')
      } else {
        history.push('/ResetPassword')
      }

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
    } else
    if (value === 'buyer') {
    await axios.post('http://localhost:5000/buyer/login',{
        email  : email,
        password : password
    })
    .then(function (response) {
        localStorage.setItem('token', response.data)
        history.push('/Home')
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
}



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event)=>{setEmail(event.target.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event)=>{setPassword(event.target.value)}}
          />
          <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange} row>
              <FormControlLabel value="buyer" control={<Radio style={{ color: '#1a1a1a'}}/>} label="Buyer" />
              <FormControlLabel value="seller" control={<Radio style={{ color: '#1a1a1a'}}/>} label="Seller" />
            </RadioGroup>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClick}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
            <Button color="inherit" href="/Signup">Don't have an account? Sign Up</Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}