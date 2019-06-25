import PropTypes from "prop-types";
import { withRouter } from "react-router";
import axios from 'axios';
import  ENDPOINT from "./../utils/http";

export default () => {
  const token = localStorage.getItem("jwttoken");
  axios({
    method: "GET",
    url: ENDPOINT.CHECK_JWT,
    headers: { 
      'Authorization' : `Bearer ${token}`
    }
  })
  .then((results) => {
    console.log("======")
    console.log(results.data)
    if (results.data.status === 200) {
      if(window.location.href === "http://localhost:3000/login" || window.location.href ===  "http://localhost:3000/signup") {
        window.location.href="http://localhost:3000/todo";
      }
    } 
  })
  .catch((e) => {
    window.location.href="http://localhost:3000/login";
  })
}