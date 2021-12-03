/**
 * Basket reducer.
 * @module reducers/baskets
 */

import {
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
} from '@eeacms/volto-freshwater/constants/ActionTypes';

const initialState = {
  items: [],
};

export default function basket(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_BASKET:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case REMOVE_FROM_BASKET:
      return {
        ...state,
        items: state.items.filter((item) => item.content !== action.payload),
      };

    default:
      return state;
  }
}
