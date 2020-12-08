import React from "react";
import APIURL from '../app/helpers/environment';
import {withRouter} from 'react-router-dom';
import './register.css';
import Footer from '../app/Footer';

class Register extends React.Component {
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
        .then(
            this.props.history.push('/dashboard')
        )
    }
            
            
        
        
    



    render() {
        return (
            <div className='register-auth-wrapper'>
            <div className='auth-inner'>
            <form onSubmit={this.handleSubmit}>
                <h3>Register Here</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Username" name='username' value={this.username} onChange={this.handleChange}/>
                    {this.state.username.length < 5 ? <span>Must be 5 or more characters</span> : null}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name='password' value={this.password} onChange={this.handleChange}/>
                    {this.state.password.length < 5 ? <span>Must be 5 or more characters</span> : null}
                </div>

                <button disable={!this.state.username || !this.state.password || this.state.username.length < 5} type="submit" className="btn btn-primary btn-block">Sign Up</button>
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

export default withRouter (Register);