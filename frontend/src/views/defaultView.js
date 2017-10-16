import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PostList from '../components/postList'
import CategoryList from '../components/categoryList';

class DefaultView extends Component {
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

export default withRouter(DefaultView);
