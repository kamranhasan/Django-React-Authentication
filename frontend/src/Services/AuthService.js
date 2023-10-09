import axios from 'axios';
import {getToken, setToken, setUser} from '../Utils/auth';

const backend = "http://localhost:8000"

export const RegisterUser = async (username, email, password) => {
    const config = {
        headers: {
            'Content-Type': 'application/json', 
        }
    }
    const data = JSON.stringify({
      username: username,
      email: email,
      password: password
    });
    return new Promise((resolve, reject) => {
        axios.post(`${backend}/auth/register`, data, config)
            .then(res => {
                setToken(res.data.token);
                setUser(res.data.user);
                console.log(res);
                resolve(res.data); // Resolve the promise with the response data
            })
            .catch((e) => {
                console.log(e);
                reject(e); // Reject the promise with the error
            });
    });
}

export const LoginUser = async (email, password) => {
    const config = {
        headers: {
            'Content-Type': 'application/json', 
        }
    }
    const data = JSON.stringify({
      email: email,
      password: password
    });
    return new Promise((resolve, reject) => {
        axios.post(`${backend}/auth/login`, data, config)
            .then(res => {
                setToken(res.data.token);
                setUser(res.data.user);
                console.log(res);
                resolve(res.data); // Resolve the promise with the response data
            })
            .catch((e) => {
                console.log(e);
                reject(e); // Reject the promise with the error
            });
    });
}


export const GetUser = async (email, password) => {
    const config = {
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Token '+getToken()
        }
    }
    return new Promise((resolve, reject) => {
        axios.get(`${backend}/auth/user`, config)
            .then(res => {
                setUser(res.data.user);
                console.log(res);
                resolve(res.data); // Resolve the promise with the response data
            })
            .catch((e) => {
                console.log(e);
                reject(e); // Reject the promise with the error
            });
    });
}