import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import CategoryView from './categoryView';
import PostDetailView from './postDetailView';
import DefaultView from './defaultView';
import ModifyPostView from './modifyPostView';

import { getCategories } from '../actions/categoryActions';
import { getPosts } from '../actions/postActions';

class App extends Component {
  componentWillMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={DefaultView} />
        <Route path="/category/:categoryPath" component={CategoryView} />
        <Route path="/postDetail" component={PostDetailView} />
        <Route path="/modifyPost" component={ModifyPostView} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(getCategories()),
    fetchPosts: () => dispatch(getPosts())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
