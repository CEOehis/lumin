import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { PRODUCTS } from '../components/ProductList';
import { CartContext } from './cart.context';

const ProductsContext = createContext(null);

const ProductsProvider = ({ children }) => {
  const { cartState } = useContext(CartContext);
  const { currency } = cartState;
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

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ProductsContext };
export default ProductsProvider;
