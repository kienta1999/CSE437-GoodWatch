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
import getUser from "./data/getUser";

function App() {
  const [currUser, setUser] = useState(null);

  useEffect(() => {
    (async () => {

      //Request user information from backend
      //Will only work if logged in and token cookie exists
      let res = await getUser();
      console.log("APP GET USER RES", res)

      var user = {}
      if (res.data.user) {
        //logged in, token exists
        user = res.data.user
      }
      else {
        //not logged in, token does not exist
        user = null
      }
      
      //Set user state
      setUser(user);
      console.log("new State", currUser)
    })();
  }, []);

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
        <Route path="/register" 
        exact 
        render={props=> (
          <Register {...props} setUser={setUser} userInfo={currUser} />
          )}
        />
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
        <Route path="/movie/:movieid" exact 
        render={props=> (
          <MoviePage {...props} setUser={setUser} userInfo={currUser} />
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
