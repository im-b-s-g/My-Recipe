import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

const ProductsCard = ({ recipe }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/user/${recipe._id}`);
  }

  return (
    <div className="UserProducts_product-card" onClick={handleClick}>
      <img className="UserProducts_product-image" src={recipe.image} alt={recipe.name} />
      <h2 className="UserProducts_product-title">{recipe.name}</h2>
      <p className="UserProducts_product-excerpt">{recipe.excerpt}</p>
    </div>
  );
};

export default ProductsCard;