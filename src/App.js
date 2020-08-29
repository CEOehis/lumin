import React, { useState, useEffect, useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import './App.css';
import CartProvider, { CartContext } from './contexts/cart.context';
import {
  addToCart,
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
} from './actions/cart.action';

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
// TODO: Bug with how the modal works, I shouldn't be able to scroll or click items beneath it
function ProductList({ fn }) {
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
            <Product key={product.id} product={product} fn={fn} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Product({ product, fn }) {
  const { cartState, dispatch } = useContext(CartContext);
  const { cart } = cartState;

  function addItemToCart() {
    const payload = {
      id: product.id,
      price: product.price,
      image_url: product.image_url,
      title: product.title,
    };

    dispatch(addToCart(payload));
    fn();
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

function Cart({ shown, fn }) {
  const { cartState } = useContext(CartContext);
  const { cart } = cartState;

  const { data } = useQuery(CURRENCY);
  const [currencyList, setCurrencyList] = useState(['USD']);

  useEffect(() => {
    setCurrencyList((data && data.currency) || ['USD']);
  }, [data]);

  return (
    <div className={`cart ${shown ? 'cart__expanded' : 'cart__collapsed'}`}>
      <div className="cart__header">
        <button className="close" type="button" onClick={fn}>
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
        {cart.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </div>
    </div>
  );
}

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
      <div>
        <div>
          <p>{item.title}</p>
        </div>
        <div className="count-price">
          <div>
            <button onClick={decrement} type="button">
              -
            </button>
            <span>{item.qty}</span>
            <button onClick={increment} type="button">
              +
            </button>
          </div>
          <p>Something</p>
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

function App() {
  const [cartShown, setCartShown] = useState(false);

  function toggleCart() {
    setCartShown(!cartShown);
  }

  return (
    <div className="app">
      <CartProvider>
        <ProductList fn={toggleCart} />
        <Cart shown={cartShown} fn={toggleCart} />
      </CartProvider>
    </div>
  );
}

export default App;
