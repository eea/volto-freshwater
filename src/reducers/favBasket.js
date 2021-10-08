const initialState = {
  basket: [],
};

export default function favBasket(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.payload],
      };

    case 'REMOVE_FROM_BASKET':
      return {
        ...state,
        basket: state.basket.filter((b) => b !== action.payload),
      };

    default:
      return state;
  }
}
