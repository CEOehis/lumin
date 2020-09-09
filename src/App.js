import React from 'react';
import './App.css';
import { CartProvider } from './contexts/cart.context';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { ProductsProvider } from './contexts/products.context';
import CartToggle from './components/CartToggle';

function App() {
  return (
    <div className="app">
      <CartProvider>
        <ProductsProvider>
          <CartToggle />
          <ProductList />
          <Cart />
        </ProductsProvider>
      </CartProvider>
    </div>
  );
}

export default App;
