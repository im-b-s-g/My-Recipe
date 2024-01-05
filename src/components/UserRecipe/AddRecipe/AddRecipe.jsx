
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';
import './AddRecipe.css';

const AddRecipe = () => {
    const token = useSelector((state) => state.auth.token);
    const decodedToken = jwtDecode(token);
    const userID = decodedToken.id;
    const navigate = useNavigate();
    const [recipeData, setRecipeData] = useState({
        name: '',
        image: '',
        excerpt: '',
        description: '',
        ingredients: '',
        steps: '',
        category: '',
        tags: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecipeData({
            ...recipeData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const ingredientsArray = recipeData.ingredients.split(',').map((item) => item.trim());
            const stepsArray = recipeData.steps.split(',').map((item) => item.trim());
            const response = await axios.post(`${BASE_URL}/api/users/addrecipe`, {
                ...recipeData,
                userId: userID,
                ingredients: ingredientsArray,
                steps: stepsArray,
                tags: recipeData.tags.split(',').map((item) => item.trim()),
            });
            console.log(response.data);
            alert('Recipe added successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    };

    return (
        <div className="add-recipe-container">
            <h2 className="add-recipe-title">Add Recipe</h2>
            <form onSubmit={handleSubmit} className="add-recipe-form">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={recipeData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="image">Image URL:</label>
                <input
                    type="text"
                    id="image"
                    name="image"
                    value={recipeData.image}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="excerpt">Excerpt:</label>
                <textarea
                    id="excerpt"
                    name="excerpt"
                    value={recipeData.excerpt}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={recipeData.description}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="ingredients">Ingredients (comma-separated):</label>
                <textarea
                    id="ingredients"
                    name="ingredients"
                    value={recipeData.ingredients}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="steps">Steps (comma-separated):</label>
                <textarea
                    id="steps"
                    name="steps"
                    value={recipeData.steps}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="category">Category:</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={recipeData.category}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="tags">Tags (comma-separated):</label>
                <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={recipeData.tags}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
};

export default AddRecipe;