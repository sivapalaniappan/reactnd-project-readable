import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostList from '../components/postList'
import CategoryList from '../components/categoryList';

import { getCategories } from '../actions/categoryActions';
import { getPosts } from '../actions/postActions';

class DefaultView extends Component {
    componentWillMount() {
        this.props.fetchCategories();
        this.props.fetchPosts();
    }

  render() {
    return(
      <div>
        <div className="App-header">
          <h2>Welcome to Readable</h2>
        </div>
        <div>
          <div style={{float: 'left'}}>
            <h1>Categories</h1>
            <CategoryList />
          </div>
          <div style={{float: 'right'}}>
            <h1>Posts</h1>
            <PostList />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(getCategories()),
    fetchPosts: () => dispatch(getPosts())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DefaultView));
