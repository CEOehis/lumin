/* eslint-disable no-case-declarations */
export const types = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  INCREMENT_QUANTITY: 'INCREMENT_QUANTITY',
  DECREMENT_QUANTITY: 'DECREMENT_QUANTITY',
  SET_DISPLAY_CART: 'SET_DISPLAY_CART',
};

const cart = (state, action) => {
  switch (action.type) {
    case types.ADD_ITEM:
      const itemIndex = state.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        return state.map((item, idx) => {
          if (idx === itemIndex) {
            return {
              ...item,
              qty: item.qty + 1,
            };
          }
          return item;
        });
      }
      return [...state, { ...action.payload, qty: 1 }];
    case types.REMOVE_ITEM:
      return state.filter((item) => item.id !== action.payload.id);
    case types.DECREMENT_QUANTITY:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          if (item.qty === 1) return item;
          return {
            ...item,
            qty: item.qty - 1,
          };
        }

        return item;
      });
    case types.INCREMENT_QUANTITY:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            qty: item.qty + 1,
          };
        }

        return item;
      });
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
      return {
        ...state,
        cart: cart(state.cart, action),
      };
    case types.SET_DISPLAY_CART:
      return {
        ...state,
        showCart: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
