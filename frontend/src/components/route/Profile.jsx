import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Carousel } from "react-bootstrap";
// import { getMovieData } from "../../data/movie.js";
import NavigationBar from "../NavigationBar.jsx";
import MyList from "../MyList.jsx";
import jwtDecode from 'jwt-decode'

const Profile = (props) => {

    //IMPORTANT: user info is passed down from App.js in props.userInfo
    
    useEffect(() => {
      var user = props.userInfo
      if (!user) {
        //not logged in, redirect to home
        props.history.push("/");
      }
    }, []);

    return (
      <div>
        <NavigationBar history={props.history} setUser={props.setUser} userInfo={props.userInfo}/>
        {props.userInfo && (
          <p>hi {props.userInfo.username}</p>
        )}
        <MyList />
      </div>
    );
  };
  
  export default Profile;