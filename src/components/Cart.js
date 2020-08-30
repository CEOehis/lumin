import React, { useState, useEffect, useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { CartContext } from '../contexts/cart.context';
import { setDisplayCart } from '../actions/cart.action';
import CartItem from './CartItem';

const CURRENCY = gql`
  query GetCurrency {
    currency
  }
`;

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

// TODO: Get user locale and query appropriate currency

function Cart() {
  const { cartState, dispatch } = useContext(CartContext);
  const { cart, showCart } = cartState;

  const { data } = useQuery(CURRENCY);
  const [currencyList, setCurrencyList] = useState(['USD']);

  useEffect(() => {
    setCurrencyList((data && data.currency) || ['USD']);
  }, [data]);

  function toggleCart() {
    dispatch(setDisplayCart(!showCart));
  }

  function calculateSubTotal() {
    return cart.reduce((acc, curr) => {
      return acc + curr.price * curr.qty;
    }, 0);
  }

  return (
    <div className={`cart ${showCart ? 'cart__expanded' : 'cart__collapsed'}`}>
      <div className="cart__header">
        <button className="close" type="button" onClick={toggleCart}>
          <i />
        </button>
        <p>Your Cart</p>
      </div>
      <div className="cart__currency">
        <select name="currency">
          {currencyList.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="cart__items">
        {!cart.length ? (
          <p className="empyt-cart">Your cart is empty. Let&apos;s Change that!</p>
        ) : null}
        {cart.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </div>
      <div className="checkout">
        <div className="total">
          <p>Subtotal</p>
          <p>{formatter.format(calculateSubTotal())}</p>
        </div>
        <button className="checkout__button checkout__button-light" type="button">
          Make this a subscription (Save 20%)
        </button>
        <button className="checkout__button checkout__button-dark" type="button">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
