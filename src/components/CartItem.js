import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../contexts/cart.context';
import { removeFromCart, decrementQuantity, incrementQuantity } from '../actions/cart.action';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

function CartItem({ item }) {
  const { dispatch } = useContext(CartContext);

  function removeItem() {
    dispatch(removeFromCart(item));
  }

  function increment() {
    dispatch(incrementQuantity(item));
  }

  function decrement() {
    if (item.qty === 1) {
      dispatch(removeFromCart(item));
      return;
    }
    dispatch(decrementQuantity(item));
  }

  return (
    <div className="item">
      <div className="item__details">
        <div>
          <p>{item.title}</p>
        </div>
        <div className="count-price">
          <div className="item__quantity">
            <button onClick={decrement} type="button">
              -
            </button>
            <span>{item.qty}</span>
            <button onClick={increment} type="button">
              +
            </button>
          </div>
          <p>{formatter.format(item.price)}</p>
        </div>
      </div>
      <div className="product-image">
        <img src={item.image_url} alt={item.title} />
      </div>
      <button className="remove-item" type="button" onClick={removeItem}>
        x
      </button>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    qty: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
