import React, { Component } from "react";
import APIURL from '../app/helpers/environment';
import './register.css';
import Footer from '../app/Footer';

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: '',
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${APIURL}/user/register`, {
            method: 'POST',
            body: JSON.stringify({user:{username: this.state.username, password: this.state.password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.authenticateUser(data.sessionToken)
            console.log('you are in!!!!');
        })
    }
            
            
        
        
    



    render() {
        return (
            <div className='register-auth-wrapper'>
            <div className='auth-inner'>
            <form onSubmit={this.handleSubmit}>
                <h3>Register Here</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Username" name='username' onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name='password' onChange={this.handleChange}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/login">sign in?</a>
                </p>
            </form>
            </div>
            <Footer/>
            </div>
        );
    }
}