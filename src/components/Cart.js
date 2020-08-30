import React, { useState, useEffect, useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { CartContext } from '../contexts/cart.context';
import { setDisplayCart, setCurrency } from '../actions/cart.action';
import CartItem from './CartItem';

const CURRENCY = gql`
  query GetCurrency {
    currency
  }
`;

function Cart() {
  const { cartState, dispatch } = useContext(CartContext);
  const { currency, cart, showCart } = cartState;

  const formatter = new Intl.NumberFormat(window.navigator.language, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  });

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
        <select
          onChange={(e) => {
            dispatch(setCurrency(e.target.value));
          }}
          name="currency"
        >
          {currencyList.map((item) => (
            <option key={item} value={item}>
              {item}
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
      {cart.length ? (
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
      ) : null}
    </div>
  );
}

export default Cart;
