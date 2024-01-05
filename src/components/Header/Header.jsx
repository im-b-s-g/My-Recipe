import React, { useEffect, useState } from 'react';
import './Header.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from '../../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const [fullName, setFullName] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const userID = decodedToken.id;
                axios
                    .get(
                        `${BASE_URL}/api/users/getUser/${userID}`
                    )
                    .then((response) => {
                        setFullName(response.data.user.fullName);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } catch (error) {
                console.error("Token parsing error:", error);
            }
        }
    }, [token]);

    const handleLoginClick = () => {
        navigate('/login');
    }

    const handleLogoutClick = () => {
        localStorage.removeItem("token");
        dispatch(logout());
    }

    return (
        <header className="recipe-header">
            <div className="logo">
                <h3>Apna Kitchen</h3>
            </div>
            <nav className="navigation">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">All</a></li>
                    <li><a href="#">Veg</a></li>
                    <li><a href="#">Non-veg</a></li>
                    <li><a href="/add">Submit a recipe</a></li>
                </ul>
            </nav>
            <div className="user_details">
                {
                    token ? (
                        <div className="user_name_login"
                            onClick={handleLogoutClick}
                        >{fullName}</div>
                    ) : (
                        <div className="user_name_login" onClick={handleLoginClick}>Login</div>
                    )
                }
            </div>
        </header>
    );
};

export default Header;