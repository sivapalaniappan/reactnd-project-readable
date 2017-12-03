const BASE_URI = 'http://localhost:3001';
const TOKEN = '503a657b-1e4c-445b-b745-86341694f8df';
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': TOKEN
}

export const getCategories = () => {
  return fetch(`${BASE_URI}/categories`, {headers})
    .then(res => res.json());
}

export const getPosts = (id = '') => {
  let url = id ? `${BASE_URI}/posts/${id}` : `${BASE_URI}/posts`;
  return fetch(url, {headers})
    .then(res => res.json());
}

export const addPost = ({id, timestamp, title, body, author, category}) => {
  return fetch(`${BASE_URI}/posts`, {headers, method: 'POST', body: JSON.stringify({
    id,
    timestamp,
    title,
    body,
    author,
    category
  })})
  .then(res => {
    console.log('add post response');
    return res.json()
  });
}

export const votePost = (id = '', typeVote) => {
  return fetch(`${BASE_URI}/posts/${id}`, {headers, method: 'POST', body: JSON.stringify({
    option: typeVote
  })})
  .then(res => res.json());
}

export const editPost = (post = {}) => {
  return fetch(`${BASE_URI}/posts/${post.id}`, {headers, method: 'PUT', body: JSON.stringify({
    title: post.title,
    body: post.body,
    category: post.category,
    author: post.author
  })})
  .then(res => {return;});
}

export const deletePost = (id = '') => {
  return fetch(`${BASE_URI}/posts/${id}`, {headers, method: 'DELETE'})
  .then(res => {return;});
}

export const getCommentsByPost = (postID = '') => {
  return fetch(`${BASE_URI}/posts/${postID}/comments`, {headers})
  .then(res => res.json());
}

export const addCommentToPost = ({id, timestamp, body, author, parentId}) => {
  return fetch(`${BASE_URI}/comments`, {headers, method: 'POST', body: JSON.stringify({
    id,
    timestamp,
    body,
    author,
    parentId
  })})
  .then(res => {return;});
}

export const getCommentById = (id = '') => {
  return fetch(`${BASE_URI}/comments/${id}`, {headers})
  .then(res => res.json());
}

export const voteComment = (id = '', typeVote) => {
  return fetch(`${BASE_URI}/comments/${id}`, {headers, method: 'POST', body: JSON.stringify({
    option: typeVote
  })})
  .then(() => {return;});
}

export const editComment = ({ timestamp, id, body }) => {
  return fetch(`${BASE_URI}/comments/${id}`, {headers, method: 'PUT', body: JSON.stringify({
    body,
    timestamp
  })})
  .then(() => {return;});
}

export const deleteComment = (id = '') => {
  return fetch(`${BASE_URI}/comments/${id}`, {headers, method: 'DELETE'})
  .then(() => {return;});
}
