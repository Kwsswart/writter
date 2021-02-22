import React, {Fragment, useState} from "react";
import {
    BrowserRouter as Router, 
    Route,
    Switch
} from "react-router-dom";
import Home from "./Home";
import Navbar from "./display/Navbar";
import Footer from "./display/Footer"
import Login from "./auth/Login";
import Register from "./auth/Register";
import MainPage from "./MainPage";
import {check} from "../login";
import Logout from "./auth/Logout";
import UserSettings from "./UserSettings";
import NotFound from "./error/NotFound";


function App() {
    const [login, setLogin] = useState(false);

    check().then(r => setLogin(r))

    return (
        <Fragment>
            <Navbar />
            <Router>
                <Switch>
                    <Route path="/" exact component={login ? MainPage: Home} />
                    <Route path="/settings" exact component={UserSettings} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/logout" exact component={Logout} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
            <Footer />
        </Fragment>
    );
}

export default App;