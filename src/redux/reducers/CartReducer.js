const initialCartState = {
  cart: [],
};

const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case 'INITIALIZE_CART':
      return {
        ...state,
        cart: action.cart,
      };

    case 'ADD_TO_CART':
      const existingIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex !== -1) {
        const newState = {
          ...state,
          cart: state.cart.map((item, index) =>
            index === existingIndex
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
        return newState;
      } else {
        const newState = {
          ...state,
          cart: [...state.cart, action.payload],
        };
        return newState;
      }

    case 'REMOVE_FROM_CART':
      const updatedCart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        cart: updatedCart,
      };

    case 'UPDATE_QUANTITY':
      const updatedState = {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
      return updatedState;

    default:
      return state;
  }
};

export default cartReducer;
