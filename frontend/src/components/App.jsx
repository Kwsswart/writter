import React, {Fragment, useState} from "react";
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
import {check} from "../login";
import Logout from "./auth/Logout";

function App() {
    const [login, setLogin] = useState(false);

    check().then(r => setLogin(r))

    return (
        <Fragment>
            <Navbar />
            <Router>
                <Route path="/" exact component={login ? MainPage: Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/logout" exact component={Logout} />
            </Router>
        </Fragment>
    );
}

export default App;