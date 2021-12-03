/**
 * Boards reducer.
 * @module reducers/boards
 */

import {
  GET_BOOKMARK,
  ADD_BOOKMARK,
  PUT_BOOKMARK,
  DELETE_BOOKMARK,
  GET_ALL_BOOKMARKS,
} from '@eeacms/volto-freshwater/constants/ActionTypes';

const initialState = {
  error: null,
  items: [],
  loaded: false,
  loading: false,
  modify: 'loaded',
  delete: 'loaded',
};

export default function boards(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_BOOKMARK}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case `${GET_BOOKMARK}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
      };
    case `${GET_BOOKMARK}_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
      };

    case `${ADD_BOOKMARK}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case `${ADD_BOOKMARK}_SUCCESS`:
      return {
        ...state,
        error: null,
        items: [...state.items, action.result],
        loaded: true,
        loading: false,
      };
    case `${ADD_BOOKMARK}_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
      };

    case `${PUT_BOOKMARK}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
        modify: 'loading',
      };
    case `${PUT_BOOKMARK}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        modify: 'loaded',
      };
    case `${PUT_BOOKMARK}_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
        modify: 'loading',
      };

    case `${DELETE_BOOKMARK}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
        delete: 'failed',
      };
    case `${DELETE_BOOKMARK}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        delete: 'loaded',
      };
    case `${DELETE_BOOKMARK}_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
        delete: 'failed',
      };

    case `${GET_ALL_BOOKMARKS}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case `${GET_ALL_BOOKMARKS}_SUCCESS`:
      return {
        ...state,
        error: null,
        items: action.result,
        loaded: true,
        loading: false,
      };
    case `${GET_ALL_BOOKMARKS}_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
      };

    default:
      return state;
  }
}
