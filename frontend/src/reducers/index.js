import { combineReducers } from 'redux';

// const url = `http://localhost:3001/categories`;
//    console.log('fetching from url', url);
//    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }
//                  } )
//      .then((res) => { return(res.text()) })
//      .then((data) => {
//        console.log('Response from backend');
//        this.setState({categories: data});
//        console.log(data)
//      });

const initialCategoriesData = [
  {
    "name": "react",
    "path": "react"
  },
  {
    "name": "redux",
    "path": "redux"
  },
  {
    "name": "udacity",
    "path": "udacity"
  }
];

const initialPostData = [
  {
    "id": "8xf0y6ziyjabvozdd253nd",
    "timestamp": 1467166872634,
    "title": "Udacity is the best place to learn React",
    "body": "Everyone says so after all.",
    "author": "thingtwo",
    "category": "react",
    "voteScore": 6,
    "deleted": false
  },
  {
    "id": "6ni6ok3ym7mf1p33lnez",
    "timestamp": 1468479767190,
    "title": "Learn Redux in 10 minutes!",
    "body": "Just kidding. It takes more than 10 minutes to learn technology.",
    "author": "thingone",
    "category": "redux",
    "voteScore": -5,
    "deleted": false
  }
];

function categories (state = initialCategoriesData, action) {
  return [...state]
}

function posts (state = initialPostData, action) {
  return [...state]
}

export default combineReducers({ categories, posts });
