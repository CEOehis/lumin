import React, { useContext } from 'react';
import { setDisplayCart } from '../actions/cart.action';
import { CartContext } from '../contexts/cart.context';

function CartToggle() {
  const {
    cartState: { cart, showCart },
    dispatch,
  } = useContext(CartContext);

  function toggleCart() {
    dispatch(setDisplayCart(!showCart));
  }

  return (
    <div className="nav__cart-toggle">
      <nav>
        <button type="button" onClick={toggleCart}>
          Cart (
          {cart.reduce((acc, curr) => {
            return acc + curr.qty;
          }, 0)}
          )
        </button>
      </nav>
    </div>
  );
}

export default CartToggle;
