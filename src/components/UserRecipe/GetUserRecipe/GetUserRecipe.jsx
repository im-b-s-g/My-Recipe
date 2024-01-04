
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../ProductsPage/ProductsCard';

const GetUserRecipe = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/users/allUserRecipes');
                setRecipes(response.data.recipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };
        fetchRecipes();
    }, []);

    return (
        <div>
            <h1>Recipes</h1>
            <ul style={{ listStyle: 'none' }}>
                {recipes.map((recipe) => (
                    <li key={recipe._id}>
                        <ProductCard recipe={recipe} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetUserRecipe;