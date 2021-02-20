import React from "react";


function Footer() {
    return (
        <footer 
            class="w3-container w3-black" 
            style={{
                position: "fixed", 
                left: 0, 
                bottom: 0, 
                width: "100%", 
                height:"15%",
                textAlign: "center"
            }}>
            <h6 style={{fontFamily: "Helvetica Neue"}}>Made by Kieron William Spearing</h6>
            <p style={{
                fontSize:"8px",
                fontFamily: "Helvetica Neue"
            }}>This is essentially a clone of the twitter web application.</p>
        </footer>
    );
}


export default Footer;