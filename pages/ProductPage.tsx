
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { Product } from '../types';
import StarRating from '../components/StarRating';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct || null);
    }
  }, [id, getProductById]);

  if (!product) {
    return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">Product not found</h2>
            <Link to="/" className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Go to Homepage</Link>
        </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg object-cover" />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <StarRating rating={product.rating} />
            <span className="text-gray-600 ml-3">({product.reviewCount} reviews)</span>
          </div>
          <p className="text-3xl font-light text-gray-900 mb-6">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-md text-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
