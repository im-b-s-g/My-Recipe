import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductsCard from './ProductsCard';
import { BASE_URL } from '../../config';
import Filter from './Filter'
import './Products.css'
const Products = () => {
    const [recipes, setRecipes] = useState([]);
    const [filters, setFilters] = useState({
        category: "",
    });
    const handleFilterChange = (updatedFilters) => {
        setFilters(updatedFilters);
    };

    useEffect(() => {
        const fetchRecipes = async () => {
            const queryParams = `?category=${filters.category}`
            try {
                const response = await axios.get(`${BASE_URL}/api/recipes/all/${queryParams}`);
                setRecipes(response.data.recipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };
        fetchRecipes();
    }, [filters]);

    return (
        <div className="recipe-list-container">
            <h1 className="recipe-list-heading">Recipes By Our Chefs</h1>
            <div className="recipe-list-filter">
                <Filter filters={filters} onFilterChange={handleFilterChange} />
            </div>
            <ul className="recipe-list">
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