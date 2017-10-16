import { SET_COMMENTS, SET_COMMENT_BY_ID } from '../actions/commentActions';

const initialState = {
  comments: []
};

export default (state = initialState, action) => {
  const { comments = [], comment = {} } = action;

  switch (action.type) {
    case SET_COMMENTS:
      return [...comments];
    case SET_COMMENT_BY_ID:
      const newState = state.map(existingComment => {
        if (existingComment.id === comment.id)
          existingComment = comment;
        return existingComment;
      });
      return [...newState];
    default:
      return [...state];
  }
}
