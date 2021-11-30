import React from "react";
import { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/route/Login.jsx";
import Register from "./components/route/Register.jsx";
import Profile from "./components/route/Profile.jsx";
import UserPage from "./components/route/UserPage.jsx";
import Home from "./components/route/Home.jsx";
import MoviePage from "./components/route/MoviePage.jsx";
import ListPage from "./components/route/ListPage.jsx";
import MoreRecs from "./components/route/MoreRecs";
import UserListPage from "./components/route/UserListPage.jsx";
import SearchResults from "./components/route/SearchResults.jsx";
import jwtDecode from "jwt-decode";
import UserContext from "./context/UserContext";
import getUser from "./data/getUser";

function App() {
  const [currUser, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      //Request user information from backend
      //Will only work if logged in and token cookie exists
      // let res = await getUser();
      // console.log("APP GET USER RES", res);

      var user = null;
      // if (res.data.user) {
      //   //logged in, token exists
      //   user = res.data.user;
      // } else {
      //   //not logged in, token does not exist
      //   user = null;
      // }
      var authtoken = localStorage.getItem('authtoken')
      if (authtoken && authtoken != "undefined") {
        console.log("EXISTS", authtoken)
        user = jwtDecode(authtoken);
      }

      //Set user state
      setUser(user);
      console.log("new State", currUser);
    })();
  }, []);

  return (
    <UserContext.Provider value={{ currUser, setUser }}>
      
      <Router>
        <Switch>
          <Route path="/login" exact render={(props) => <Login {...props} />} />
          <Route
            path="/register"
            exact
            render={(props) => <Register {...props} />}
          />
          <Route
            path="/profile"
            exact
            render={(props) => <Profile {...props} />}
          />
          <Route
            path="/profile/list/:listid"
            exact
            render={(props) => <ListPage {...props} />}
          />
          <Route 
            path="/" 
            exact 
            render={(props) => <Home {...props} />} 
          />
          <Route
            path="/more/:type"
            exact
            render={(props) => <MoreRecs {...props} />}
          />
          <Route
            path="/searchresult/:query"
            exact
            render={(props) => <SearchResults {...props} />}
          />
          <Route
            path="/movie/:movieid"
            exact
            render={(props) => <MoviePage {...props} />}
          />
          <Route
            path="/user/:userid"
            exact
            render={(props) => <UserPage {...props} />}
          />
          <Route
            path="/user/list/:userid/:listid"
            exact
            render={(props) => <UserListPage {...props} />}
          />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;