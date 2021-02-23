import React, {Fragment, Link } from "react";
import logo from "../assets/images/logo.png";


function Home() {
    return (
        <Fragment>
            <div>
                <div 
                    className="w3-container w3-center w3-white"
                    style={{ 
                        height: "100vh", 
                        width:"40%", 
                        float: "left" }}>
                    <img src={logo} style={{ paddingTop: "5%" ,height: "80%", width:"80%"}} alt="Logo" />
                </div>

                <div 
                    className="w3-container w3-center w3-blue"
                    style={{ 
                        height: "100vh", 
                        width: "60%", 
                        float: "left", 
                        paddingTop: "5%"}}>
                    <h1 className="w3-xxlarge" style={{fontFamily: "Helvetica Neue"}}>Welcome to, Writter!</h1>
                    <p className="w3-large" style={{color:"black", fontFamily: "Helvetica Neue"}}>Join Writter today!</p>
                    <div className="w3-container" style={{ paddingTop: "4%"}}>
                        <div style={{ paddingBottom: "2%"}}>
                            <button
                                className="w3-btn w3-blue w3-border w3-border-white w3-round-xxlarge"
                                onClick={(e)=>{
                                    e.preventDefault();
                                    window.location="/login";
                                }}
                                style={{ 
                                    fontFamily: "Helvetica Neue", 
                                    width: "200px"}}>
                                Login
                            </button>
                        </div>
                        <div>
                            <button 
                                className="w3-btn w3-white w3-border w3-border-blue w3-round-xxlarge"
                                onClick={(e)=>{
                                    e.preventDefault();
                                    window.location="/register";
                                }}
                                style={{ 
                                    fontFamily: "Helvetica Neue", 
                                    width: "200px"}}>
                            Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div> 
        </Fragment>
    );
}

export default Home;