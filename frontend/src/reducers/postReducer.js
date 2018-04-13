import { SET_POSTS, SET_POST, SET_POST_BY_ID, SET_NEW_POST } from '../actions/postActions';

const initialState = {
  posts: [],
  post: {}
};

export default (state = initialState, action) => {
  const { posts = [], post = {} } = action;

  switch (action.type) {
    case SET_POSTS:
      return [...posts];
    case SET_POST:
      return [
        ...state,
        post
      ]
    case SET_POST_BY_ID:
      const newState = state.map(existingPost => {
        if (existingPost.id === post.id)
          existingPost = post;
        return existingPost;
      });
      return [...newState];
    case SET_NEW_POST:
      return [
        ...state,
        post
      ];
    default:
      return [...state];
  }
}
