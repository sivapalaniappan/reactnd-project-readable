import React, { Component } from 'react';
import PostList from '../components/postList';
import CategoryList from '../components/categoryList';

class DefaultView extends Component {
  render() {
    return(
      <div>
        <div className="App-header">
          <h2>Welcome to Readable</h2>
        </div>
        <div>
          <h1>Categories</h1>
          <CategoryList />
        </div>
        <div>
          <h1>Posts</h1>
          <PostList />
        </div>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   console.log('inside stateToProps')
//   const { categories } = state;
//   return {
//     categories
//   }
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     someFunc: (data) => dispatch(someOtherFunction(data))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(DefaultView);
export default DefaultView;
