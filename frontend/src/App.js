import React from 'react'
import "./App.css";
import Login from './Login';
import Register from './Register';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
            </Switch>
        </Router>
    );
}

export default App;
