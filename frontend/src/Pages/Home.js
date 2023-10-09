import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {GetUser} from '../Services/AuthService';
import NavBar from '../Components/Navbar';
import Table from '../Components/Table';

const Home = () => {
    const [user, setUser] = useState({})
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        GetUser()
        .then((res) => {
                setUser(res.user)
            } 
        )
    })
    

    return (
        <div>
            <NavBar email={user?.email} />
            <Table products={products} />
           {/* HOME {user?.username} */}
        </div>    
    );
}

export default Home;
