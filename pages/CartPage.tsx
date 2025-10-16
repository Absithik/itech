
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-3xl font-bold mb-6 border-b pb-4">Your Shopping Cart</h1>
      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-4">
              <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-lg font-semibold">-</button>
                <span className="px-4 py-1">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-lg font-semibold">+</button>
              </div>
              <p className="font-semibold w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <button onClick={clearCart} className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Clear Cart</button>
        <div className="text-right">
          <p className="text-2xl font-bold">Total: ${cartTotal.toFixed(2)}</p>
          <button onClick={() => alert('This is a dummy checkout!')} className="mt-4 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
