import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Product from './Product';

const PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      image_url
      price(currency: USD)
    }
  }
`;

function ProductList() {
  const { loading, error, data } = useQuery(PRODUCTS);

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
