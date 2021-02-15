import React from "react";

function WeetItem(props) {
    return (
        <div 
            className="w3-card w3-border w3-border-gray w3-round-large"
            style={{ marginTop: "2rem" }}>
            <div className="w3-container" style={{ padding: "2rem" }}>
                <h2 className="w3-opacity w3-xxlarge">
                    {props.title}
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