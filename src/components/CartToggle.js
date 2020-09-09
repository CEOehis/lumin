import React from 'react';
import { setDisplayCart } from '../actions/cart.action';
import { useCartState, useCartDispatch } from '../contexts/cart.context';

function CartToggle() {
  const { cart, showCart } = useCartState();
  const dispatch = useCartDispatch();

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
