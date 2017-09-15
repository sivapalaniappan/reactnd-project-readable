import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PostList extends Component {
  componentWillMount() {
    this.setState({ sort: 'scoreDesc' });
  }

  render() {
    let { posts } = this.props;
    const { categoryPath = '' } = this.props;

    if(categoryPath && categoryPath !== 'All') {
      posts = posts.filter(post => post.category === categoryPath )
    }

    switch(this.state.sort) {
      case ('scoreAsc') :
        posts.sort((a,b) => {
          if (a.voteScore < b.voteScore)
            return -1;
          if (a.voteScore > b.voteScore)
            return 1;
          return 0;
        })
        break;

      case ('scoreDesc') :
        posts.sort((a,b) => {
          if (a.voteScore > b.voteScore)
            return -1;
          if (a.voteScore < b.voteScore)
            return 1;
          return 0;
        })
        break;

      default:
        break;
    }

    return (
      <div>
        <div>
          <span>Sort: </span>
          <select onChange={(e) => this.setState({ sort: e.target.value })}>
            <option value="scoreDesc">Score High to Low</option>
            <option value="scoreAsc">Score Low to High</option>
          </select>
        </div>
        {posts && posts.map((post, index) => {
          return (
            <Link key={index} to={{pathname: '/postDetail',
                                query: { postID: post.id }
                      }}>
              <div>{post.title} by {post.author}</div>
              <div>Score: {post.voteScore} Category: {post.category} Created: {post.timestamp}</div>
            </Link>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps)(PostList);
