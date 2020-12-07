import React, { Component } from "react";
import './login.css'
import {withRouter} from 'react-router-dom';
import APIURL from '../app/helpers/environment';
import Footer from '../app/Footer';

class Login extends Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state={
            email: '',
            password: ''

        }
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({user:{username: this.state.username, password: this.state.password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.authenticateUser(data.sessionToken)
            console.log(data);
        })
        .then(
            this.props.history.push('/dashboard')
        )
    }


    render() {
        return (
            <div className='login-auth-wrapper'>
            <div className='auth-inner'>
            <form onSubmit={this.handleSubmit}>
                <h3>Login</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="username" className="form-control" placeholder="Enter username" name='username' onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name='password' onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
            </div>
            <Footer/>
            </div>
        );
    }
}

export default withRouter (Login);