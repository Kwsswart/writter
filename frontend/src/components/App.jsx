import React, {Fragment} from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import Login from "./auth/Login";
import Register from "./auth/Register";
import {
    BrowserRouter as Router, 
    Route,
    Switch
} from "react-router-dom";
import MainPage from "./MainPage";

function App() {
    return (
        <Fragment>
            <Navbar />
            <Router>
                <Route path="/" exact component={Home} />
                <Route path="/main" exact component={MainPage} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
            </Router>
        </Fragment>
    );
}

export default App;