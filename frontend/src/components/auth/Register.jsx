import React, {Component} from "react";
import axios from "axios";
import Alert from "../error/Alert";


class Register extends Component {

    initialState = {
        email: '',
        username: '',
        pwd: '',
        err: ''
    }
    state = this.initialState;

    handleChange = (field) => (e) => this.setState({
        [field]:e.target.value
    }, () =>{console.log(this.state)});

    emailChange = this.handleChange('email');
    usernameChange = this.handleChange('username');
    pwdChange = this.handleChange('pwd');

    register = (e) => {
        e.preventDefault();
        axios
            .post("/api/register", {
                // Change this to grab from state by changing state on click in field
                email: this.state.email,
                username: this.state.username,
                pwd: this.state.pwd
            })
            .then((res) => {
                if (res.data.error){
                    this.setState({err: res.data.error})
                } else {
                    this.setState(this.initialState, this.setState({ register: true }));
                    window.location = "/login"
                }
            });
    };

    render() {
        const {email, username, pwd} = this.state;

        return (
            <div className="w3-card-4" style={{ margin: "2rem", marginBottom:"10%"}}>
                <div className="w3-container w3-blue w3-center w3-xlarge">
                   Register 
                </div>
                <div className="w3-container">
                    {/* Display error message */}
                    {this.state.err.length > 0 && (
                        <Alert
                            message={`Check your form and try again! (${this.state.err})`}
                        />
                    )}
                    <form onSubmit={this.register}>
                        <p>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="w3-input w3-border"
                                id="email"
                                onChange={this.emailChange}
                                value={email}
                            />
                        </p>
                        <p>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="w3-input w3-border"
                                id="username"
                                onChange={this.usernameChange}
                                value={username}
                            />
                        </p>
                        <p>
                            <label htmlFor="pwd">Password</label>
                            <input
                                type="password"
                                className="w3-input w3-border"
                                id="pwd"
                                onChange={this.pwdChange}
                                value={pwd}
                            />
                        </p>
                        <p>
                            <button type="submit" className="w3-button w3-blue">
                                Register
                            </button>
                            {this.state.register && <p>You're registered!</p>}
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;