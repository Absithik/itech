
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col">
      <Link to={`/product/${product.id}`} className="block">
        <img className="w-full h-56 object-cover" src={product.imageUrl} alt={product.name} />
      </Link>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          <Link to={`/product/${product.id}`} className="hover:text-indigo-600">{product.name}</Link>
        </h3>
        <div className="flex items-center mb-2">
          <StarRating rating={product.rating} />
          <span className="text-sm text-gray-500 ml-2">({product.reviewCount} reviews)</span>
        </div>
        <p className="text-sm text-gray-600 flex-grow mb-4">{product.description.substring(0, 80)}...</p>
        <div className="mt-auto flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
