import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Joi from "joi-browser";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Visibility from "@material-ui/icons/Visibility";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {loginStatusAction} from '../../App/actions'
import {ProductConsumer} from '../../context'
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    marginTop: "5%",
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
  registerBtn: {
    padding: "8px 0",
    marginTop: "5%",
  },
  errorText: {
    color: "#f44336",
  },
  loginLink:{
    color:"#fff",
    textDecoration:"none"
  }
}));

export default function Login() {
  const classes = useStyles();
  // const stateSelector = createStructuredSelector({
   
  // });
  // const dispatch = useDispatch();
  // const onChangeLoginStatus = (data) => dispatch(loginStatusAction(data));
 
  
  const [values, setValues] = React.useState({
    data: {
      password: "",
      email: "",
    },
    showPassword: false,
    errors: {},
  });
  const handleApiCall=async()=>{
    console.log(values.data,"object send");
    try{
    const {data}=await  axios.post(`http://68.183.135.125:3100/api/auth/login`,values.data)
    if(data){
      console.log(data,"data");
    }
    }
    catch(err){
      console.log(err,"error occured");
    }
  }

  // Login validation schema for Joi
  const loginSchema = {
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2 })
      .label("Email"),
    password: Joi.string().required().min(5).label("Password"),
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setValues({ ...values, errors: errors || {} });
    if (errors) return;
    // Call the server...
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

  return (
    <ProductConsumer>
      {(value)=>{
        return(
  
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
           type={values.showPassword ? "text" : "password"}
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
         className={classes.registerBtn}
         variant="contained"
         color="primary"
         onClick={(e)=>{handleSubmit(e);value.handleLoginStatus(true);handleApiCall()}}
       >
         <NavLink to="/" className={classes.loginLink}>
            Login
          </NavLink>
       </Button>
      
     </form>
   </CardContent>
 </Card>
</div>

        )
      }}

    </ProductConsumer>
  );
}
