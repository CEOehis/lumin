import React from 'react';
import './App.css';
import CartProvider from './contexts/cart.context';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  return (
    <div className="app">
      <CartProvider>
        <ProductList />
        <Cart />
      </CartProvider>
    </div>
  );
}

export default App;
