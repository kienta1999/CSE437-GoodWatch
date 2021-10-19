import React from "react";
import "./App.css";
import Login from "./components/route/Login.jsx";
import Register from "./components/route/Register.jsx";
import Profile from "./components/route/Profile.jsx";
import Home from "./components/route/Home.jsx";
import MoviePage from "./components/route/MoviePage.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/" exact component={Home} />
        <Route path="/movie/:movieid" exact component={MoviePage} />
      </Switch>
    </Router>
  );
}

export default App;
