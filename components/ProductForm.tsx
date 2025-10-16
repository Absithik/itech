
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { generateProductDescription } from '../services/geminiService';

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (productData: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price.toString());
      setImageUrl(product.imageUrl);
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) {
      alert('Name and Price are required.');
      return;
    }
    onSubmit({
      name,
      description,
      price: parseFloat(price),
      imageUrl: imageUrl || `https://picsum.photos/seed/${name.replace(/\s+/g, '-')}/400/400`,
    });
  };
  
  const handleGenerateDescription = async () => {
    if (!name) {
      alert("Please enter a product name first.");
      return;
    }
    setIsGenerating(true);
    const generatedDesc = await generateProductDescription(name);
    setDescription(generatedDesc);
    setIsGenerating(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">{product ? 'Edit Product' : 'Add New Product'}</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <div className="flex items-start space-x-2">
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button 
              type="button" 
              onClick={handleGenerateDescription}
              disabled={isGenerating}
              className="mt-1 px-3 py-2 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-md hover:bg-indigo-200 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isGenerating ? 'Generating...' : '✨ Gen AI'}
            </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Enter a product name and click "Gen AI" to auto-generate a description.</p>
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input
          id="price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL (optional)</label>
        <input
          id="imageUrl"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
         <p className="text-xs text-gray-500 mt-1">If left blank, a random image will be assigned based on the product name.</p>
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">{product ? 'Update Product' : 'Add Product'}</button>
      </div>
    </form>
  );
};

export default ProductForm;
