import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductsCard from './ProductsCard';
import { BASE_URL } from '../../config';

const Products = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/recipes/all`);
                setRecipes(response.data.recipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };
        fetchRecipes();
    }, []);

    return (
        <div>
            <h1>Recipes By Our Chefs</h1>
            <ul style={{ listStyle: 'none' }}>
                {recipes.map((recipe) => (
                    <li key={recipe._id}>
                        <ProductsCard recipe={recipe} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;