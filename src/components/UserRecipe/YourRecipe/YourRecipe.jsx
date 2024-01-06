
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YourProductsCard from './YourProductsCard';
import { BASE_URL } from '../../../config';
import { useSelector } from 'react-redux';
import { jwtDecode } from "jwt-decode";

const YourRecipe = () => {
    const [recipes, setRecipes] = useState([]);
    const token = useSelector((state) => state.auth.token);
    let userID;
    if (token) {
        const decodedToken = jwtDecode(token);
        userID = decodedToken.id;
    }
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/users/recipeByUser/${userID}`);
                setRecipes(response.data.recipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };
        fetchRecipes();
    }, []);

    return (
        <div className='recipe-list-container'>
            <h1 className="recipe-list-heading">Your Recipes</h1>
            <ul className="recipe-list">
                {recipes.map((recipe) => (
                    <li key={recipe._id}>
                        <YourProductsCard recipe={recipe} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default YourRecipe;