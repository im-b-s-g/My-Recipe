
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import './ProductsPage.css';
import { BASE_URL } from '../../../config';

const YourProductsPage = () => {
    const token = useSelector((state) => state.auth.token);
    const decodedToken = jwtDecode(token);
    const userID = decodedToken.id;

    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/users/getOneByUser/${id}`);
                setRecipe(response.data.recipes[0]);
                const userResponse = await axios.get(`${BASE_URL}/api/users/getUser/${response.data.recipes[0].userId}`);
                setUser(userResponse.data.user.fullName);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };
        fetchRecipe();
    }, [id]);

    const handleEdit = () => {
        navigate(`/edit/${recipe._id}`);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${BASE_URL}/api/users/removeYourRecipe/${id}`, { data: { userId: userID } });
            alert('Recipe Deleted Successfully');
            navigate('/');
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    if (!recipe) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="YourProducts_recipe-container">
            <h1 className="YourProducts_recipe-title">{recipe.name}</h1>
            <img className="recipe-image" src={recipe.image} alt={recipe.name} />
            <p className="YourProducts_recipe-description">{recipe.description}</p>
            <h2 className="YourProducts_recipe-section-title">Ingredients:</h2>
            <ol className="YourProducts_recipe-list">
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="YourProducts_recipe-list-item">{ingredient}</li>
                ))}
            </ol>
            <h2 className="YourProducts_recipe-section-title">Steps:</h2>
            <ul className="YourProducts_recipe-list" >
                {recipe.steps.map((step, index) => (
                    <li key={index} className="YourProducts_recipe-list-item"><span>{`Step:${index + 1} `}</span>{step}</li>
                ))}
            </ul>
            <p className="YourProducts_submitted-by"><span style={{ fontWeight: 'bold' }}>Recipe By :</span> {user}</p>

            <div className="YourProducts_recipe_buttons">
                <button className='YourProducts_edit_button' onClick={handleEdit}>Edit</button>
                <button className='YourProducts_delete_button' onClick={handleDelete}>Delete</button>
            </div>
        </div >
    );
};

export default YourProductsPage;