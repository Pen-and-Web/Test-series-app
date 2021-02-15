import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
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
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            The Test
          </Typography>
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
        </Toolbar>
      </AppBar>
    </div>
  );
}
