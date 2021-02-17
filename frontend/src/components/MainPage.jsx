import React, {Component, Fragment} from 'react';
import WeetItem from './WeetItem';
import AddWeet from './AddWeet';
import Axios from "axios";

/**
 * Component designed to display the main view once logged in
 */

class MainPage extends Component {
    state ={weets: []}

    componentDidMount() {
        Axios.get("/api/weets").then(res => {
            console.log(res)
            this.setState({weets: res.data.reverse()})
        });
    }

    render(){
        const {weets} = this.state;
        return (
            <Fragment>
                <div
                    className="w3-container w3-jumbo"
                    style={{ margin: "3rem", paddingLeft: "1rem"}}>
                    <h1>Weets</h1>
                    <button 
                        className="w3-button w3-blue w3-large"
                        onClick={() => {
                            document.getElementById("addWeet").style.display = "block";
                        }}>Add Weet</button>
                </div>
                <AddWeet />
                <div className="w3-container">

                    {weets.length === 0 ? <p className="w3-xlarge w3-opacity" style={{marginLeft:"2rem"}}>No weets! Create one!</p> : weets.map((item, index) =>{
                        return (
                            <WeetItem
                                title={item.title}
                                content={item.content}
                                key={index}
                            />
                        );
                    })}
                </div>
            </Fragment>
        );
    }
}

export default MainPage;