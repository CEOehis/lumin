import React from 'react';
import './App.css';
import CartProvider from './contexts/cart.context';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductsProvider from './contexts/products.context';

function App() {
  return (
    <div className="app">
      <CartProvider>
        <ProductsProvider>
          <ProductList />
          <Cart />
        </ProductsProvider>
      </CartProvider>
    </div>
  );
}

export default App;
