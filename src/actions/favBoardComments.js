export const addComment = (comment, group) => {
  return {
    type: 'ADD_COMMENT',
    payload: { group: group, comment: comment },
  };
};

export const deleteComment = (comment, group) => {
  return {
    type: 'DELETE_COMMENT',
    payload: { group: group, comment: comment },
  };
};
