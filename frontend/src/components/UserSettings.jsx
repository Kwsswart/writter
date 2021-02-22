import Alert from "./error/Alert";
import Axios from "axios";
import React, {Component} from "react";

/**
 * Component designed to display the user settings.
 *  Controlled via 3 main options "main" "cpwd" "del" <- set in currentSetting
 */

class UserSettings extends Component {

    state ={
        currentSetting: "main",
        password: '',
        npassword: '',
        rpassword: '',
        err: '',
        pwderr: ''
    }

    componentDidMount() {
        if (!localStorage.getItem("token")) {
            window.location ="/login";
        }
    }

    handleChange = (field) => (e) => this.setState({
        [field]:e.target.value
    }, () =>{
        if (this.state.npassword !== this.state.rpassword) {
            this.setState({pwderr: "Repeat New Password and New password need to be the same"});
        } else {
            this.setState({pwderr: ''});
        }
        console.log(this.state)});
    
    pwdChange = this.handleChange('password');
    npwdChange = this.handleChange('npassword');
    rpwdChange = this.handleChange('rpassword');
    

    changePassword = (e) =>{
        e.preventDault();
        if (this.state.rpassword !== this.state.npassword) {
            this.setState({pwderr: "Repeat New Password and New password need to be the same"});
            return;
        }
        Axios.post("/api/changepassword", {
            password: this.state.password,
            npassword: this.state.npassword,
            rpassword: this.state.rpassword
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
                if (res.data.error) {
                    this.setState({err: res.data.error});
                } else {
                    alert("Password Changed! Please log back in!");
                    window.location = "/logout";
                }
        })
    }

    deleteAccount = (e) => {
        e.preventDault();
        let x = window.confirm("Are you sure you want to delete your account? THIS CANNOT BE UNDONE!!!");
        if (x) {
            Axios.delete("api/deleteaccount", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then( res => {
                if (res.data.error) {
                    alert("An error occured: " + res.data.error);
                } else {
                    alert("Your account has been deleted");
                    window.location = "/logout";
                }
            })
        }
    }

    render(){

        return (
            <div className="w3-container" style={{ margin: "3rem", paddingBottom:"5%"}}>
                <div className="w3-card w3-border w3-round-large">
                    <header 
                        className="w3-container w3-xlarge w3-blue"
                        style={{
                            padding: "0.5rem",
                            paddingLeft: "3rem"
                        }}>
                        Settings
                    </header>
                    <div className="w3-container">
                        {this.state.err.length > 0 && <Alert message={this.state.err} />}
                        {this.state.currentSetting === "main" &&
                            <div style={{margin: "1rem"}}>
                                <h1 className="w3-xxlarge">Setting</h1>
                                <hr className="w3-border-top w3-border-black" />
                                <ul className="w3-ul w3-border w3-hoverable">
                                    <li 
                                        className="w3-hover-light-gray"
                                        onClick ={() => this.setState({currentSetting: "cpwd"})} 
                                        style={{cursor: "pointer"}}>
                                        Change Password
                                    </li>
                                    <li 
                                        className="w3-text-red w3-hover-pale-red w3-hover-text-red"
                                        onClick = {() => this.setState({currentSetting: "del"})}
                                        style={{cursor: "pointer"}}>
                                        Delete Account
                                    </li>
                                </ul>
                            </div>}
                        {this.state.currentSetting === "cpwd" && 
                            <div style={{margin: "1rem"}}>
                                <h1 className="w3-xxlarge">Change Password</h1>
                                <hr className="w3-border-top w3-border-black" />
                                <button 
                                    className="w3-button w3-blue"
                                    onClick = {() => this.setState({currentSetting: "main"})}>
                                    &laquo; Back
                                </button>
                                <form onSubmit={this.changePassword}>
                                    <p>
                                        <label htmlFor="password">Current Password</label>
                                        <input 
                                            type="password" 
                                            id="password" 
                                            className="w3-input w3-border"
                                            onChange={this.pwdChange} />
                                    </p>
                                    <p>
                                        <label htmlFor="npassword">New Password</label>
                                        <input 
                                            type="password" 
                                            id="npassword" 
                                            className="w3-input w3-border"
                                            onChange={this.npwdChange} />
                                    </p>
                                    <p>
                                        <label htmlFor="rpassword">Repeat New Password</label>
                                        <input 
                                            type="password" 
                                            id="rpassword" 
                                            className="w3-input w3-border"
                                            onChange={this.rpwdChange} />
                                        {this.state.pwderr && <Alert message={this.state.pwderr} />}
                                    </p>
                                    <p>
                                        <button type="submit" className="w3-button w3-blue">Submit</button>
                                    </p>
                                </form>
                            </div>}
                        {this.state.currentSetting == "del" &&
                            <div style={{margin: "1rem"}}>
                            <h1 className="w3-xxlarge w3-text-red">Delete account</h1>
                            <hr className="w3-border-top w3-border-black"/>
                            <button 
                                className="w3-button w3-blue"
                                onClick = {() => this.setState({currentSetting: "main"})}>
                                &laquo; Back
                            </button>
                            <p>
                                <button 
                                    className="w3-button w3-red w3-large" 
                                    onClick={this.deleteAccount}>
                                    DELETE ACCOUNT
                                </button>
                            </p>
                        </div>}
                    </div>
                </div>

            </div>
        );
    }
}

export default UserSettings;