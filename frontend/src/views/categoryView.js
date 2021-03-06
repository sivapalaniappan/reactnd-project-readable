import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PostList from '../components/postList';

class CategoryView extends Component {
  render() {
    const { category = 'All' } = this.props.match.params;

    return (
      <div>
        <div className="App-header">
          <h2>Category Page</h2>
        </div>
        <PostList category={category} />
      </div>
    );
  }
}

export default withRouter(CategoryView);
