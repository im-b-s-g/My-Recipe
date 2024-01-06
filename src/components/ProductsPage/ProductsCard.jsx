import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

const ProductsCard = ({ recipe }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${recipe._id}`);
  }

  return (
    <div className="productspage-product-card" onClick={handleClick}>
      <img className="productspage-product-image" src={recipe.image} alt={recipe.name} />
      <h2 className="productspage-product-title">{recipe.name}</h2>
      <p className="productspage-product-excerpt">{recipe.excerpt}</p>
    </div>
  );
};

export default ProductsCard;