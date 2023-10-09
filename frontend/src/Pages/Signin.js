import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {LoginUser} from '../Services/AuthService';

const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    function handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        
        if (name == 'email') {
            setEmail(value)
        } else {
            setPassword(value)
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        LoginUser(
            email, 
            password
        )
        .then((res) => {
            navigate('/home');
        })
        .catch(error => {
            console.error('Failed to Login User', error);
        });
    }

    return (
        <div className='App'>
            <div className="App__Aside"></div>
            <div className="App__Form">
                <div className="PageSwitcher">
                  <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                  <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
                </div>
                <div className="FormTitle">
                  <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
                </div>
        
                <div className="FormCenter">
                    <form onSubmit={handleSubmit} className="FormFields" onSubmit={handleSubmit}>
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                        <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={email} onChange={handleChange} />
                      </div>

                      <div className="FormField">
                        <label className="FormField__Label" htmlFor="password">Password</label>
                        <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={password} onChange={handleChange} />
                      </div>

                      <div className="FormField">
                          <button className="FormField__Button mr-20">Sign In</button> <Link to="/" className="FormField__Link">Create an account</Link>
                      </div>
                    </form>
                  </div>     
            </div>
        </div>    
    );
}

export default Signin;
