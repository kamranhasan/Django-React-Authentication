import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { HashRouter, Route, Routes, Navigate, NavLink } from "react-router-dom";
import Signup from "./Pages/Signup.js";
import Signin from "./Pages/Signin.js";
import Home from "./Pages/Home.js";
import {checkToken} from "./Utils/auth";

function App() {
  const [isLoggedin, setIsLoggedIn] = useState(checkToken)
  
  const protected_routes = [
    <Route exact path={`/home`} element={<Home />} />,
  ]
  
  return (
        <Routes>
          <Route path={`/*`} element={<Signup />} />
          <Route exact path={`/sign-in`} element={<Signin />} />
          {isLoggedin && protected_routes.map(
            (route) => route
          )}
        </Routes>
  );
}

export default App;
