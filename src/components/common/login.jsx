import { login } from './../../services/authService';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Joi from 'joi-browser';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { getUserLocalStorage } from './../../services/authService';
import { forgetPassword } from './../../services/authService';
import FacebookIcon from '@material-ui/icons/Facebook';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { SocialIcon } from 'react-social-icons';
import axios from 'axios';

import SocialButton from '../socialButtons';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    marginTop: '5%',
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '35ch',
    },
  },
  loginBtn: {
    padding: '8px 0',
    marginTop: '5%',
  },
  errorText: {
    color: '#f44336',
  },
  loginLink: {
    color: '#fff',
    textDecoration: 'none',
  },
}));

export default function Login({ onLogin }) {
  const history = useHistory();
  useEffect(() => {
    if (getUserLocalStorage()) {
      history.push('/');
    }
  }, []);

  const classes = useStyles();

  const [values, setValues] = useState({
    data: {
      password: '',
      email: '',
    },
    showPassword: false,
    errors: {},
  });

  // Login validation schema for Joi
  const loginSchema = {
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2 })
      .label('Email'),
    password: Joi.string().required().min(5).label('Password'),
  };
  const signup = (res) => {
    const googleresponse = {
      Name: res.profileObj.name,

      email: res.profileObj.email,

      token: res.googleId,

      Image: res.profileObj.imageUrl,

      ProviderId: 'Google',
    };

    debugger;

    axios
      .post('http://localhost:3100/api/auth/google/', googleresponse)

      .then((result) => {
        let responseJson = result;

        // sessionStorage.setItem("userData", JSON.stringify(result));

        history.push('/home');
      });
  };
  const handleRequest = async () => {
    console.log('request called');
    let url = 'http://localhost:3100/api/auth/google';
    try {
      // const response = await axios.get(
      //   `http://localhost:3100/api/auth/google`,withCr
      // );
      // console.log(response);
      await axios({
        method: 'get',
        url,
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      });
    } catch (err) {
      console.log('====================================');
      console.log(err, 'error occured');
      console.log('====================================');
    }
  };
  //   Validates entire form on form submit
  let validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(values.data, loginSchema, options);
    const errors = {};
    if (!error) return null;

    error.details.forEach((error) => {
      errors[error.path[0]] = error.message;
    });
    return errors;
  };

  // handles login form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setValues({ ...values, errors: errors || {} });
    if (errors) return;

    // Login user here...

    try {
      // NOTE: change dto with values.data
      // const dto = {
      //   email: 'john4@gmail.com',
      //   password: 'pass@123',
      // };
      const res = await login(values.data);

      if (res) {
        onLogin();
        // Redirect user to home page
        history.push('/');
      }
    } catch (ex) {
      toast.error('Something went wrong ');
      console.log(ex);
    }
  };

  // validates single property
  const validateProperty = ({ name, value }) => {
    const schema = { [name]: loginSchema[name] };
    const obj = { [name]: value };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  // handles input change
  const handleChange = ({ currentTarget: input }) => {
    const { errors, data } = values;

    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    data[input.name] = input.value;
    setValues({ ...values, data, errors });
  };

  // Toggles password visibility
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const responseGoogle = (response) => {
    console.log(response);
    var res = response.profileObj;
    console.log(res);
    debugger;
    signup(response);
  };
  const handleSocialLogin = (user) => {
    console.log(user);
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Login
          </Typography>
          <form className={classes.form} noValidate autoComplete="off">
            {/* Email */}
            <FormControl>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                error={!!values.errors.email}
                value={values.data.email}
                onChange={handleChange}
                aria-describedby="component-error-text"
              />
              <FormHelperText
                className={classes.errorText}
                id="component-error-text"
              >
                {values.errors.email}
              </FormHelperText>
            </FormControl>

            {/* Password */}
            <FormControl>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                error={!!values.errors.password}
                type={values.showPassword ? 'text' : 'password'}
                value={values.data.password}
                onChange={handleChange}
                aria-describedby="component-error-text"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                className={classes.errorText}
                id="component-error-text"
              >
                {values.errors.password}
              </FormHelperText>
            </FormControl>

            {/* Login button */}
            <Button
              size="small"
              className={classes.loginBtn}
              variant="contained"
              color="primary"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Login
            </Button>
          </form>

          <div>
            <p style={{ fontSize: '0.8rem' }}>Login with social media</p>
            {/* <p>Login with social media</p>
            <FacebookIcon
              style={{
                width: '3rem',
                height: '3rem',
                marginBottom: '0.2rem',
                cursor: 'pointer',
              }}
            /> */}
            <SocialIcon
              url="http://facebook.com/"
              style={{
                marginRight: '1rem',
                marginBottom: '1rem',
                width: '2rem',
                height: '2rem',
                cursor: 'pointer',
              }}
              // onClick={() => {
              //   handleRequest();
              // }}
            />
            {/* <GoogleLogin
              clientId="1090438885488-tbu9mo0t1jjhn2gkkrfsoat8aokhqeud.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseGoogle()}
              onFailure={responseGoogle()}
            ></GoogleLogin> */}

            <SocialIcon
              url="http://google.com/"
              style={{ marginBottom: '1rem', width: '2rem', height: '2rem' }}
            />
          </div>
          <NavLink to="/getCode" style={{ marginTop: '1rem' }}>
            Forgot Password
          </NavLink>
        </CardContent>
      </Card>
    </div>
  );
}
