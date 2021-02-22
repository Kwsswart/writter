import React, {Fragment} from "react";
import logo from "../../assets/images/logo.png";


function NotFound() {
    return (
        <Fragment>    
            <div 
                className="w3-container w3-center w3-white"
                style={{ 
                    height: "100%", 
                    width:"40%", 
                    float: "left" }}>
                <img src={logo} style={{ paddingTop: "10%" ,height: "100%"}} alt="Logo" />
            </div>

            <div 
                className="w3-container w3-center w3-blue"
                style={{ 
                    height: "100%", 
                    width: "60%", 
                    float: "left", 
                    paddingTop: "5%",
                    paddingBottom: "50%"}}>
                <h1 style={{fontFamily: "Helvetica Neue"}}>404</h1>
                <p className="w3-xxlarge" style={{fontFamily: "Helvetica Neue"}}>The page you were searching for cannot be found</p>
                <button 
                    className="w3-btn w3-white w3-border w3-border-blue w3-round-xxlarge"
                    onClick={()=>window.location="/"}
                    style={{ 
                        fontFamily: "Helvetica Neue", 
                        width: "200px"}}>
                        &laquo; Back
                </button>
            </div>
        </Fragment>
    )
}


export default NotFound;