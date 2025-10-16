
import React from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const { products } = useProducts();

  return (
    <div className="space-y-8">
        <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Welcome to <span className="text-indigo-600">ReactStore</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Discover our curated selection of high-quality electronics and accessories. Built with React, styled with Tailwind.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
            <ProductCard key={product.id} product={product} />
        ))}
        </div>
    </div>
  );
};

export default HomePage;
