import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import { ProductConsumer } from "../../context";

// import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 2,
    textAlign: "start",
    marginLeft: "20px",
  },
  loginLink: {
    margin: "0 10px",
    textDecoration: "none",
    color: "#fff",
  },
  registerLink: {
    margin: "0 10px",
    textDecoration: "none",
    color: "#fff",
  },
  imageStyle:{
    margin: "0 10px",
    cursor:"pointer"
  }
}));


export default function Navbar() {
  const classes = useStyles();
  // const [loginStatus,setLoginStatus]=React.useState(true)

  const handleNavBar=()=>{
    return(
    <ProductConsumer>
      {(value)=>{
        if(value.loginStatus==false){
           return(
             <>
            <NavLink color="inherit" to="/login" className={classes.loginLink}>
            Login
         </NavLink>
        <NavLink
          color="inherit"
          to="/register"
          className={classes.registerLink}
        >
          Register
        </NavLink>
        </>
           )
        }
        if(value.loginStatus==true){
          return(
            <>
            <NavLink color="inherit" to="/profile" className={classes.loginLink}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.imageStyle} />
            </NavLink>
            <NavLink color="inherit" to="/profile" className={classes.loginLink}>
               
                 Usama
              </NavLink>
             <NavLink
               color="inherit"
               to="/login"
               className={classes.registerLink}
             >
               Logout
             </NavLink>
       </>  
          )

        }
      
        
      }}
    </ProductConsumer>
    )

  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            The Test
          </Typography>
          {/* <NavLink color="inherit" to="/login" className={classes.loginLink}>
            Login
          </NavLink>
          <NavLink
            color="inherit"
            to="/register"
            className={classes.registerLink}
          >
            Register
          </NavLink> */}
          {handleNavBar()}
        </Toolbar>
      </AppBar>
    </div>
  );
}
