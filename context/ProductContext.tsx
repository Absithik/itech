
import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { Product } from '../types';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
}

const initialProducts: Product[] = [
  { id: '1', name: 'Ergonomic Wireless Mouse', description: 'A comfortable, high-precision wireless mouse with 6 programmable buttons and a long-lasting battery. Perfect for work and gaming.', price: 49.99, imageUrl: 'https://picsum.photos/seed/mouse/400/400', rating: 4.5, reviewCount: 120 },
  { id: '2', name: 'Mechanical RGB Keyboard', description: 'A full-sized mechanical keyboard with customizable RGB backlighting, tactile switches, and a durable aluminum frame.', price: 129.99, imageUrl: 'https://picsum.photos/seed/keyboard/400/400', rating: 4.8, reviewCount: 250 },
  { id: '3', name: '4K Ultra HD Monitor', description: '27-inch 4K UHD monitor with HDR support, providing stunning visuals and vibrant colors for creative professionals and enthusiasts.', price: 349.99, imageUrl: 'https://picsum.photos/seed/monitor/400/400', rating: 4.7, reviewCount: 88 },
  { id: '4', name: 'Noise-Cancelling Headphones', description: 'Over-ear headphones with industry-leading noise cancellation, superior sound quality, and all-day comfort.', price: 299.00, imageUrl: 'https://picsum.photos/seed/headphones/400/400', rating: 4.9, reviewCount: 540 },
  { id: '5', name: 'Webcam with Ring Light', description: '1080p HD webcam with a built-in ring light, ensuring you look your best in video calls and streams.', price: 79.50, imageUrl: 'https://picsum.photos/seed/webcam/400/400', rating: 4.4, reviewCount: 95 },
  { id: '6', name: 'Portable SSD 1TB', description: 'Blazing-fast portable SSD with 1TB of storage, perfect for transferring large files and backing up your data on the go.', price: 119.99, imageUrl: 'https://picsum.photos/seed/ssd/400/400', rating: 4.6, reviewCount: 150 },
];

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = useCallback((productData: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => {
    const newProduct: Product = {
      ...productData,
      id: new Date().getTime().toString(),
      rating: Math.floor(Math.random() * 3) + 3, // Random rating between 3 and 5
      reviewCount: Math.floor(Math.random() * 100), // Random review count
    };
    setProducts(prev => [newProduct, ...prev]);
  }, []);

  const updateProduct = useCallback((updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const getProductById = useCallback((id: string) => {
    return products.find(p => p.id === id);
  }, [products]);

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};
