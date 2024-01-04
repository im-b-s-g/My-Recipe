import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ recipe }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${recipe._id}`);
  }

  return (
    <div className="product-card" onClick={handleClick}>
      <img className="product-image" src={recipe.image} alt={recipe.name} />
      <h2 className="product-title">{recipe.name}</h2>
      <p className="product-excerpt">{recipe.excerpt}</p>
    </div>
  );
};

export default ProductCard;