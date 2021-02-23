import React, {Component} from "react";
import Alert from '../error/Alert';
import {check, login} from "../../login";

/**
 * Login form component.
 */

class Login extends Component {
    initialState = {
        email: '',
        pwd: '',
        err: ''
    }
    state = this.initialState;

    componentDidMount() {
        check().then(r=> {if (r){
            window.location ="/";
        }});
    }
    handleChange = (field) => (e) => this.setState({
        [field]:e.target.value
    });
    
    emailChange = this.handleChange('email');
    pwdChange = this.handleChange('pwd');

    login = (e) => {
        e.preventDefault();
        login(this.state.email, this.state.pwd)
        .then((res) => {
            if (res === true) {
                this.setState(this.initialState, this.setState({ login: true }));
                window.location = "/" // look into using redirect component to avoid manipulating DOM
            } else {
                this.setState({err: res});
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