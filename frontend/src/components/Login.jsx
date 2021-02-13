import React, {Component} from "react";
import axios from "axios";
import Alert from './Alert';

class Login extends Component {

    initialState = {
        email: '',
        pwd: '',
        err: ''
    }
    state = this.initialState;

    handleChange = (field) => (e) => this.setState({
        [field]:e.target.value
    }, () =>{console.log(this.state)});

    emailChange = this.handleChange('email');
    pwdChange = this.handleChange('pwd');

    login = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5000/api/login", {
                // Change this to grab from state by on click storing in state
                email: this.state.email,
                pwd: this.state.pwd
            })
            .then((res) => {
                if (res.data.error){
                    this.setState({err: res.data.error})
                } else {
                    this.setState(this.initialState, this.setState({ login: true }));
                    
                }
            });
    };

    render() {
        const {email, pwd} = this.state;
        return (
            <div className="w3-card-4" style={{ margin: "2rem" }}>
                <div className="w3-container w3-blue w3-center w3-xlarge">
                    Login
                </div>
                <div className="w3-container">
                    {/* Display error message */}
                    {this.state.err.length > 0 && (
                        <Alert
                            message={`Check your form and try again! (${this.state.err})`}
                        />
                    )}
                    <form onSubmit={this.login}>
                        <p>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="w3-input w3-border"
                                onChange={this.emailChange}
                                id="email"
                                value={email}
                            />
                        </p>
                        <p>
                            <label htmlFor="pwd">Password</label>
                            <input
                                type="password"
                                className="w3-input w3-border"
                                onChange={this.pwdChange}
                                id="pwd"
                                value={pwd}
                            />
                        </p>
                        <p>
                            <button type="submit" className="w3-button w3-blue">
                                Login
                            </button>
                            {this.state.login && <p>You're logged in!</p>}
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;