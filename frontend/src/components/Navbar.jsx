import React from "react";

/**
 * Navigation Component
 */

function Navbar() {
    return (
        <div className="w3-bar w3-black">
            <a className="w3-bar-item w3-button" href="/">
                Writter
            </a>
            <div style={{ float: "right" }}>
                <a className="w3-bar-item w3-button" href="/login">
                    Login
                </a>
                <a className="w3-bar-item w3-button" href="/register">
                    Register
                </a>
            </div>
        </div>
    );
}

export default Navbar;