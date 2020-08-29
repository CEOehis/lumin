/* eslint-disable no-case-declarations */
export const types = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  INCREMENT_QUANTITY: 'INCREMENT_QUANTITY',
  DECREMENT_QUANTITY: 'DECREMENT_QUANTITY',
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

// TODO: I should have an initial state here
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

    // case types.ADD_TO_CART:
    // case types.GET_CART:
    // case types.CREATE_ORDER:
    // case types.PAY_WITH_STRIPE:
    //   return {
    //     ...state,
    //     loading: action.payload,
    //   };
    // case types.ADD_TO_CART_SUCCESS:
    // case types.GET_CART_SUCCESS:
    //   return {
    //     ...state,
    //     cart: action.payload,
    //   };
    // case types.ADD_TO_CART_ERROR:
    // case types.GET_CART_ERROR:
    // case types.CREATE_ORDER_ERROR:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   };
    // case types.CREATE_ORDER_SUCCESS:
    //   return {
    //     ...state,
    //     order: action.payload,
    //   };
    // case types.PAY_WITH_STRIPE_SUCCESS:
    //   return {
    //     ...state,
    //     charge: action.payload,
    //   };
    default:
      return state;
  }
};

export default cartReducer;
