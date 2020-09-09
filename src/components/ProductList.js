import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Product from './Product';
import { useCartState } from '../contexts/cart.context';

export const PRODUCTS = gql`
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
  const { currency } = useCartState();
  const { loading, error, data } = useQuery(PRODUCTS, {
    variables: { currency },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <>
        <p>Unable to fetch Products with this currency, {currency}.</p>
        <p>Please reload this page to continue</p>
      </>
    );
  }

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
