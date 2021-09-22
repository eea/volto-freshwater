const initialState = {
  comments: [],
};

export default function favBoardComments(state = initialState, action) {
  switch (action.type) {
    case 'ADD_COMMENT':
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    case 'DELETE_COMMENT':
      return {
        ...state,
        comments: state.comments.filter(
          (b) => b.comment !== action.payload.comment,
        ),
      };

    default:
      return state;
  }
}
