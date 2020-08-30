/* eslint-disable no-case-declarations */
export const types = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  INCREMENT_QUANTITY: 'INCREMENT_QUANTITY',
  DECREMENT_QUANTITY: 'DECREMENT_QUANTITY',
  SET_DISPLAY_CART: 'SET_DISPLAY_CART',
  SET_CURRENCY: 'SET_CURRENCY',
  UPDATE_CART_PRICES: 'UPDATE_CART_PRICES',
};

function getUpdatedProductPrices(products) {
  const result = {};
  products.forEach((product) => {
    result[product.id] = product.price;
  });
  return result;
}

const cart = (state, action) => {
  let newState;

  switch (action.type) {
    case types.ADD_ITEM:
      const itemIndex = state.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        newState = state.map((item, idx) => {
          if (idx === itemIndex) {
            return {
              ...item,
              qty: item.qty + 1,
            };
          }
          return item;
        });
      } else {
        newState = [...state, { ...action.payload, qty: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    case types.REMOVE_ITEM:
      newState = state.filter((item) => item.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    case types.DECREMENT_QUANTITY:
      newState = state.map((item) => {
        if (item.id === action.payload.id) {
          if (item.qty === 1) return item;
          return {
            ...item,
            qty: item.qty - 1,
          };
        }

        return item;
      });
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    case types.INCREMENT_QUANTITY:
      newState = state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            qty: item.qty + 1,
          };
        }

        return item;
      });
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    case types.UPDATE_CART_PRICES:
      const idToPricesMap = getUpdatedProductPrices(action.payload);
      newState = state.map((item) => {
        return {
          ...item,
          price: idToPricesMap[item.id],
        };
      });
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case types.ADD_ITEM:
    case types.REMOVE_ITEM:
    case types.DECREMENT_QUANTITY:
    case types.INCREMENT_QUANTITY:
    case types.UPDATE_CART_PRICES:
      return {
        ...state,
        cart: cart(state.cart, action),
      };
    case types.SET_DISPLAY_CART:
      return {
        ...state,
        showCart: action.payload,
      };
    case types.SET_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
