/**
 * Bookmark reducers
 */

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
    case `GET_BOOKMARK_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case `GET_BOOKMARK_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
      };
    case `GET_BOOKMARK_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
      };

    case `ADD_BOOKMARK_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case `ADD_BOOKMARK_SUCCESS`:
      return {
        ...state,
        error: null,
        items: [...state.items, action.result],
        loaded: true,
        loading: false,
      };
    case `ADD_BOOKMARK_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
      };

    case `PUT_BOOKMARK_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
        modify: 'loading',
      };
    case `PUT_BOOKMARK_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        modify: 'loaded',
      };
    case `PUT_BOOKMARK_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
        modify: 'loading',
      };

    case `DEL_BOOKMARK_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
        delete: 'failed',
      };
    case `DEL_BOOKMARK_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        delete: 'loaded',
      };
    case `DEL_BOOKMARK_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
        delete: 'failed',
      };

    case `GET_BOOKMARKS_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case `GET_BOOKMARKS_SUCCESS`:
      return {
        ...state,
        error: null,
        items: action.result,
        loaded: true,
        loading: false,
      };
    case `GET_BOOKMARKS_FAIL`:
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
