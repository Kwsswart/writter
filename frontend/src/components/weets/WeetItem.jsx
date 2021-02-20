import React from "react";

/**
 * Component designed to display each weet
 */

function WeetItem(props) {
    return (
        <div 
            className="w3-card w3-border w3-border-gray w3-round-large"
            style={{ marginTop: "2rem" }}>
            <div className="w3-container" style={{ padding: "2rem" }}>
                <h2 className="w3-opacity w3-xxlarge">
                    <span className="w3-opacity">{props.title}</span>
                    <button className="w3-right w3-button w3-red w3-large w3-hover-pale-red w3-round-large">Delete</button>
                </h2>
                
                <div dangerouslySetInnerHTML={{ __html: props.content }}></div>
            </div>
            <footer className="w3-container 3-center w3-large">
                <button className="w3-button" style={{ marginRight: "2rem" }}>
                    Like
                </button>
                <button className="w3-button" style={{ marginRight: "2rem" }}>
                    ReWeet
                </button>
                <button className="w3-button">
                    Reply
                </button>
            </footer>
        </div>
    );
}

export default WeetItem;