import { doStringifySearchquery } from '@eeacms/volto-freshwater/utils';

export function getBookmark(uid, group, querystring = '') {
  return {
    type: 'GET_BOOKMARK',
    request: {
      op: 'get',
      path: `/@bookmark?uid=${uid}&group=${group}&queryparams=${doStringifySearchquery(
        querystring,
      )}`,
    },
  };
}

export function addBookmark(uid, group, querystring = '', payload = {}) {
  return {
    type: 'ADD_BOOKMARK',
    request: {
      op: 'post',
      path: `/@bookmark`,
      data: {
        uid,
        group,
        queryparams: doStringifySearchquery(querystring),
        payload,
      },
    },
  };
}

export function modifyBookmark(uid, group, querystring = '', payload = {}) {
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
}

export function deleteBookmark(uid, group, querystring = '') {
  return {
    type: 'DEL_BOOKMARK',
    request: {
      op: 'del',
      path: `/@bookmark`,
      data: {
        uid,
        group,
        queryparams: querystring,
      },
    },
  };
}

export function getAllBookmarks(owner) {
  return {
    type: 'GET_BOOKMARKS',
    request: {
      op: 'get',
      path: `/@bookmarks-all` + (owner ? `?owner=${owner}` : ``),
    },
  };
}
