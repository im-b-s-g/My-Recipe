import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

const ProductsCard = ({ recipe }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/your/${recipe._id}`);
  }

  return (
    <div className="YourProduct_product-card" onClick={handleClick}>
      <img className="YourProduct_product-image" src={recipe.image} alt={recipe.name} />
      <h2 className="YourProduct_product-title">{recipe.name}</h2>
      <p className="YourProduct_product-excerpt">{recipe.excerpt}</p>
    </div>
  );
};

export default ProductsCard;