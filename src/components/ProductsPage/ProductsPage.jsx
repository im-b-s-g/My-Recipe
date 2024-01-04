
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductsPage.css';
import { BASE_URL } from '../../config';

const ProductsPage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/recipes/${id}`);
                console.log(response);
                setRecipe(response.data.recipe);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="recipe-container">
            <h1 className="recipe-title">{recipe.name}</h1>
            <img className="recipe-image" src={recipe.image} alt={recipe.name} />
            <p className="recipe-description">{recipe.description}</p>
            <h2 className="recipe-section-title">Ingredients:</h2>
            <ol className="recipe-list">
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="recipe-list-item">{ingredient}</li>
                ))}
            </ol>
            <h2 className="recipe-section-title">Steps:</h2>
            <ol className="recipe-list">
                {recipe.steps.map((step, index) => (
                    <li key={index} className="recipe-list-item"><span>{`Step:${index + 1} `}</span>{step}</li>
                ))}
            </ol>
        </div>
    );
};

export default ProductsPage;