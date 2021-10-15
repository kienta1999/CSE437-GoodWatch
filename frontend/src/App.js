import React from "react";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Home from "./home/Home.jsx";
import MoviePage from "./movie_page/MoviePage.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/" exact component={Home} />
        <Route path="/movie/:movieid" exact component={MoviePage} />
      </Switch>
    </Router>
  );
}

export default App;
