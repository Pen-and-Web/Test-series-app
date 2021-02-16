import React from "react";
import Tests from './common/tests';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {makeSelectLoginStatus} from '../App/selectors'
const useStyles=makeStyles((theme)=>({
  box:{
   
    backgroundColor:"gray",
    height:"25rem",
    width:"30rem"
  }

}));

export default function Home() {


  const classes=useStyles();
  return (
    <div> 
      {" "}
      <Tests/>{" "}
    </div>
  );
}
