
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from '../../../config';

const EditRecipe = () => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const decodedToken = jwtDecode(token);
    const userID = decodedToken.id;
    const { id } = useParams();

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

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/recipes/${id}`);
                const recipe = response.data.recipe;

                if (recipe.userId !== userID) {
                    alert('You are not authorized to edit this recipe.');
                    navigate('/');
                }

                setRecipeData({
                    name: recipe.name,
                    image: recipe.image,
                    excerpt: recipe.excerpt,
                    description: recipe.description,
                    ingredients: recipe.ingredients.join(', '),
                    steps: recipe.steps.join(', '),
                    category: recipe.category,
                    tags: recipe.tags.join(', '),
                });
            } catch (error) {
                console.error('Error fetching recipe for editing:', error);
            }
        };

        fetchRecipe();
    }, [id, userID]);

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
            const ingredientsArray = recipeData.ingredients.split(',').map(item => item.trim());
            const stepsArray = recipeData.steps.split(',').map(item => item.trim());

            const response = await axios.put(`${BASE_URL}/api/recipes/edit/${id}`, {
                ...recipeData,
                userId: userID,
                ingredients: ingredientsArray,
                steps: stepsArray,
                tags: recipeData.tags.split(',').map(item => item.trim()),
            });

            console.log(response.data);
            alert('Recipe edited successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error editing recipe:', error);
        }
    };

    return (
        <div>
            <h2>Edit Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={recipeData.name} onChange={handleChange} required />

                <label htmlFor="image">Image URL:</label>
                <input type="text" id="image" name="image" value={recipeData.image} onChange={handleChange} required />

                <label htmlFor="excerpt">Excerpt:</label>
                <textarea id="excerpt" name="excerpt" value={recipeData.excerpt} onChange={handleChange} required />

                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={recipeData.description} onChange={handleChange} required />

                <label htmlFor="ingredients">Ingredients (comma-separated):</label>
                <textarea id="ingredients" name="ingredients" value={recipeData.ingredients} onChange={handleChange} required />

                <label htmlFor="steps">Steps (comma-separated):</label>
                <textarea id="steps" name="steps" value={recipeData.steps} onChange={handleChange} required />

                <label htmlFor="category">Category:</label>
                <input type="text" id="category" name="category" value={recipeData.category} onChange={handleChange} required />

                <label htmlFor="tags">Tags (comma-separated):</label>
                <input type="text" id="tags" name="tags" value={recipeData.tags} onChange={handleChange} required />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditRecipe;