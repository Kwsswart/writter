import Axios from "axios";
import React, {Component, Fragment} from 'react';
import WeetItem from './weets/WeetItem';
import AddWeet from './weets/AddWeet';
import {check} from '../login';


/**
 * Component designed to display the main view once logged in
 */

class MainPage extends Component {
    state ={
        weets: [], 
        currentUser:{
            username: ''}
        }

    componentDidMount() {
        check().then(r => console.log(r))
        Axios.get("/api/weets").then(res => {
            this.setState({weets: res.data.reverse()})
        });
        Axios.get("/api/getcurrentuser", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            this.setState({currentUser: res.data})
        }, 500)
    }

    render(){
        const {weets, currentUser} = this.state;
        return (
            <Fragment>
                <div
                    className="w3-container w3-jumbo"
                    style={{ margin: "3rem", paddingLeft: "1rem"}}>
                    <h1 style={{fontFamily: "Helvetica Neue"}}>Weets</h1>
                    <button 
                        className="w3-button w3-blue w3-large"
                        onClick={() => {
                            document.getElementById("addWeet").style.display = "block";
                        }}
                        style={{fontFamily: "Helvetica Neue"}}>Add Weet</button>
                </div>
                <AddWeet />
                <div className="w3-container" style={{marginBottom:"25%"}}>

                    {weets.length === 0 ? <p className="w3-xlarge w3-opacity" style={{marginLeft:"2rem"}}>No weets! Create one!</p> : weets.map((item, index) =>{
                        return (
                            <WeetItem
                                id={item.id}
                                title={item.title}
                                content={item.content}
                                author={item.user.username}
                                isOwner={currentUser.username === item.user.username}
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