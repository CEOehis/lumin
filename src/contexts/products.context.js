import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { PRODUCTS } from '../components/ProductList';
import { useCartState } from './cart.context';

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const { currency } = useCartState();
  const { loading, error, data } = useQuery(PRODUCTS, {
    variables: { currency },
  });

  const contextValues = {
    products: data ? data.products : [],
    loading,
    error,
  };

  return (
    <ProductsContext.Provider value={{ ...contextValues }}>{children}</ProductsContext.Provider>
  );
};

function useProductState() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useCartState must be used within a CartProvider');
  }

  return context;
}

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useProductState, ProductsProvider };
