import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { CartContext } from '../contexts/cart.context';
import { setDisplayCart, setCurrency } from '../actions/cart.action';
import CartItem from './CartItem';
import { ProductsContext } from '../contexts/products.context';

const CURRENCY = gql`
  query GetCurrency {
    currency
  }
`;

/**
 * Map products to product id to ensure fast look ups
 * @param {Array} products
 * @returns {Object} table of product id mapped to product
 */
function mapProductIdToProduct(products) {
  const result = {};
  products.forEach((product) => {
    result[product.id] = product;
  });
  return result;
}

function Cart() {
  const {
    cartState: { currency, cart, showCart },
    dispatch,
  } = useContext(CartContext);
  const { products, loading, error } = useContext(ProductsContext);

  const formatter = new Intl.NumberFormat(window.navigator.language, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  });

  const { data, loading: loadingCurrency } = useQuery(CURRENCY);

  const productList = mapProductIdToProduct(products);

  function toggleCart() {
    dispatch(setDisplayCart(!showCart));
  }

  if (loading)
    return (
      <div className={`cart ${showCart ? 'cart__expanded' : 'cart__collapsed'}`}>
        <p>Loading...</p>
      </div>
    );
  if (error) {
    localStorage.setItem('currency', 'USD');
    return (
      <div className={`cart ${showCart ? 'cart__expanded' : 'cart__collapsed'}`}>
        <p>Error</p>
      </div>
    );
  }

  function calculateSubTotal() {
    return cart.reduce((acc, curr) => {
      return acc + productList[curr.id].price * curr.qty;
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
          value={currency}
          name="currency"
        >
          {!loadingCurrency ? (
            data.currency.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))
          ) : (
            <option value="USD">USD</option>
          )}
        </select>
      </div>
      <div className="cart__items">
        {!cart.length ? (
          <p className="empty-cart">Your cart is empty. Let&apos;s Change that!</p>
        ) : null}
        {cart.map((cartItem) => (
          <CartItem key={cartItem.id} item={{ ...productList[cartItem.id], qty: cartItem.qty }} />
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
