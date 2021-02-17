import React, {useState} from "react";
import {check} from "../login";

/**
 * Navigation Component
 */

function Navbar() {
    const [login, setLogin] = useState(false);

    check().then(r => setLogin(r))

    return (
        <div className="w3-bar w3-black">
            <a className="w3-bar-item w3-button" href="/">
                Writter
            </a>
            {login ? 
            <div style={{ float: "right" }}>
                <a className="w3-bar-item w3-button" href="/logout">
                    Logout
                </a>
            </div>  :
            <div style={{ float: "right" }}>
                <a className="w3-bar-item w3-button" href="/login">
                    Login
                </a>
                <a className="w3-bar-item w3-button" href="/register">
                    Register
                </a>
            </div>}
        </div>
    );
}

export default Navbar;