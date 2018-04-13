import * as api from '../utils/api';

export const SET_POSTS = 'SET_POSTS';
export const SET_POST = 'SET_POST';
export const SET_NEW_POST = 'SET_NEW_POST';
export const SET_POST_BY_ID = 'SET_POST_BY_ID';

export const setPosts = posts => ({
  type: SET_POSTS,
  posts
});

export const setPost = post => ({
  type: SET_POST,
  post
});

export const setPostById = post => ({
  type: SET_POST_BY_ID,
  post
});

export const setNewPost = post => ({
  type: SET_NEW_POST,
  post
});

export const getPosts = () => dispatch => (
  api.getPosts().then(res => dispatch(setPosts(res)))
)

export const getPost = (postId) => dispatch => (
  api.getPosts(postId).then(res => dispatch(setPost(res)))
)

export const votePost = (postID, typeVote) => dispatch => (
  api.votePost(postID, typeVote).then(res => dispatch(setPostById(res)))
)

export const addPost = (post, callback) => dispatch => (
  api.addPost(post).then(res => callback())
)

export const editPost = (post, callback) => dispatch => (
  api.editPost(post).then(res => callback())
)

export const deletePost = (postId, callback) => dispatch => (
  api.deletePost(postId).then(res => callback())
)
