import { doStringifySearchquery } from '@collective/volto-bookmarks/helpers';

export const addItemToBasket = (basket) => {
  return {
    type: 'ADD_TO_BASKET',
    payload: basket,
  };
};

export const removeItemFromBasket = (basket) => {
  return {
    type: 'REMOVE_FROM_BASKET',
    payload: basket,
  };
};

export const getAllBookmarks = (owner) => {
  return {
    type: 'GET_BOOKMARKS',
    request: {
      op: 'get',
      path: `/@bookmarks-all` + (owner ? `?owner=${owner}` : ``),
    },
  };
};
export const modifyBookmark = (uid, group, querystring = '', payload = {}) => {
  return {
    type: 'PUT_BOOKMARK',
    request: {
      op: 'put',
      path: `/@bookmark-update`,
      data: {
        uid,
        group,
        queryparams: doStringifySearchquery(querystring),
        payload,
      },
    },
  };
};
