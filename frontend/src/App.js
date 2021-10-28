import React from "react";
import { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/route/Login.jsx";
import Register from "./components/route/Register.jsx";
import Profile from "./components/route/Profile.jsx";
import Home from "./components/route/Home.jsx";
import MoviePage from "./components/route/MoviePage.jsx";
import jwtDecode from 'jwt-decode'
import getUser from "./data/otherRequests";

function App() {
  const [currUser, setUser] = useState({authToken: "", user: {}});

  useEffect(() => {
    var token = localStorage.getItem('token')
    var user = {}
    if (token) {
      user = jwtDecode(token)
    }
    var newState = {
      authToken: token,
      user: user
    }
    setUser(newState);
    console.log("App.js getting token", token)
    console.log("App.js getting user", user)
    console.log("new State", currUser)
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     let res = await getUser(localStorage.getItem('token'));
  //     console.log("APP GET USER RES", res)
  //   })();
  // }, []);

  return (
    <Router>
      <Switch>
        <Route 
        path="/login" 
        exact 
        render={props=> (
          <Login {...props} setUser={setUser} userInfo={currUser} />
          )}
        />
        <Route path="/register" exact component={Register} />
        <Route 
        path="/profile" 
        exact 
        render={props=> (
          <Profile {...props} setUser={setUser} userInfo={currUser} />
          )}
        />
        <Route path="/" exact 
        render={props=> (
          <Home {...props} setUser={setUser} userInfo={currUser} />
          )}
        /> 
        <Route path="/movie/:movieid" exact component={MoviePage} />
      </Switch>
    </Router>
  );
}

export default App;
