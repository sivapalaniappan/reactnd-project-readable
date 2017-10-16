import * as api from '../utils/api';

export const SET_COMMENTS = 'SET_COMMENTS';
export const SET_COMMENT_BY_ID = 'SET_COMMENT_BY_ID';

export const setComments = comments => ({
  type: SET_COMMENTS,
  comments
});

export const setCommentById = comment => ({
  type: SET_COMMENT_BY_ID,
  comment
});

export const getComments = (postId) => dispatch => (
  api.getCommentsByPost(postId).then(res => dispatch(setComments(res)))
)

export const voteComment = (commentId, typeVote) => dispatch => (
  api.voteComment(commentId, typeVote).then(res => dispatch(getCommentById(commentId)))
)

export const getCommentById = (commentId) => dispatch => (
  api.getCommentById(commentId).then(res => dispatch(setCommentById(res)))
)

export const addCommentToPost = (comment, postId) => dispatch => (
  api.addCommentToPost(comment).then(res => dispatch(getComments(postId)))
)

export const editCommentToPost = (comment, postId) => dispatch => (
  api.editComment(comment).then(res => dispatch(getComments(postId)))
)

export const deleteComment = (commentId, postId) => dispatch => (
  api.deleteComment(commentId).then(res => dispatch(getComments(postId)))
)
