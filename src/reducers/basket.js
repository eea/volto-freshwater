const initialState = {
  items: [],
};

export default function basket(state = initialState, action) {
  // console.log('action.payload', action.payload);
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case 'REMOVE_FROM_BASKET':
      return {
        ...state,
        items: state.items.filter((item) => item.content !== action.payload),
      };

    default:
      return state;
  }
}
