import React, { useEffect, useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import Product from './Product';
import { CartContext } from '../contexts/cart.context';
import { updateCartPrices } from '../actions/cart.action';

const PRODUCTS = gql`
  query GetProducts($currency: Currency!) {
    products {
      id
      title
      image_url
      price(currency: $currency)
    }
  }
`;

function ProductList() {
  const { cartState, dispatch } = useContext(CartContext);
  const { currency } = cartState;
  const { loading, error, data, refetch } = useQuery(PRODUCTS, {
    variables: { currency },
  });

  useEffect(() => {
    refetch().then((result) => {
      dispatch(updateCartPrices(result.data.products));
    });
  }, [currency, refetch, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="main">
      <header className="header">
        <div className="container">
          <h1>All Products</h1>
          <p>A 360&deg; look at Lumin</p>
        </div>
      </header>
      <section className="">
        <div className="product-list container">
          {data.products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductList;
