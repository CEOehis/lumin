import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../contexts/cart.context';
import { addToCart, setDisplayCart } from '../actions/cart.action';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

function Product({ product }) {
  const { dispatch } = useContext(CartContext);

  function addItemToCart() {
    const payload = {
      id: product.id,
      price: product.price,
      image_url: product.image_url,
      title: product.title,
    };

    dispatch(addToCart(payload));
    dispatch(setDisplayCart(true));
  }

  return (
    <div className="product">
      <div className="product-image">
        <img src={product.image_url} alt={product.title} />
      </div>
      <div>
        <p className="product-title">{product.title}</p>
        <p className="product-price">From {formatter.format(product.price)}</p>
        <div>
          <button onClick={addItemToCart} className="action" type="button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;