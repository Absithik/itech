
import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import ProductForm from '../components/ProductForm';

const AdminPage: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsFormVisible(true);
  };
  
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormVisible(true);
  };

  const handleFormSubmit = (productData: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => {
    if (editingProduct) {
      updateProduct({ ...editingProduct, ...productData });
    } else {
      addProduct(productData);
    }
    setIsFormVisible(false);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Logout</button>
      </div>

      {isFormVisible ? (
        <ProductForm product={editingProduct} onSubmit={handleFormSubmit} onCancel={handleCancel} />
      ) : (
        <div>
          <div className="flex justify-end mb-4">
            <button onClick={handleAddNew} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Add New Product</button>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map(product => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover" src={product.imageUrl} alt={product.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button onClick={() => handleEdit(product)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                      <button onClick={() => deleteProduct(product.id)} className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
