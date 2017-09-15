import React, { Component } from 'react';

class PostDetail extends Component {
  render () {
    return (
      <div>
        <div className="App-header">
          <h2>Post Details Page</h2>
        </div>
        <div>THIS IS FOR POSTDETAIL for {this.props.location.query.postID}</div>
      </div>
    );
  }
}

export default PostDetail;
