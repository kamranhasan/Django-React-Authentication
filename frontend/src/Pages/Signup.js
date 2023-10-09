import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {RegisterUser} from '../Services/AuthService';

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [hasAgreed, setHasAgreed] = useState('')
    const navigate = useNavigate();
    

    function handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        if (name == 'name') {
            setName(value)
        } else if (name == 'email') {
            setEmail(value)
        } else if (name == 'password') {
            setPassword(value)
        } else {
            setHasAgreed(value)
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(name)
        RegisterUser(
            name, 
            email, 
            password
        )
        .then((res) => {
            navigate('/home');
        })
        .catch(error => {
            console.error('Failed to Register User', error);
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
                <form onSubmit={handleSubmit} className="FormFields">
                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="name">Username</label>
                    <input type="text" id="name" className="FormField__Input" placeholder="Enter your username" name="name" value={name} onChange={handleChange} />
                  </div>
                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="password">Password</label>
                    <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={password} onChange={handleChange} />
                  </div>
                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="email">Email Address</label>
                    <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={email} onChange={handleChange} />
                  </div>

                  <div className="FormField">
                    <label className="FormField__CheckboxLabel">
                        <input className="FormField__Checkbox" type="checkbox" name="hasAgreed" value={hasAgreed} onChange={handleChange} /> I agree all statements in <a href="" className="FormField__TermsLink">terms of service</a>
                    </label>
                  </div>

                  <div className="FormField">
                      <button className="FormField__Button mr-20">Sign Up</button> <Link to="/sign-in" className="FormField__Link">I'm already member</Link>
                  </div>
                </form>
              </div>
            </div>
        </div>            
    );
}

export default Signup;
