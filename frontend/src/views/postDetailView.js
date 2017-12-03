import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import crypto from 'crypto';

import { getComments, voteComment, addCommentToPost, editCommentToPost, deleteComment } from '../actions/commentActions';
import { votePost, deletePost } from '../actions/postActions';

const style = {
  height: 'auto',
  width: 'auto',
  margin: 20,
  padding: 20,
  textAlign: 'justify',
  display: 'inline-block',
};

class PostDetail extends Component {
  componentWillMount() {
    this.props.fetchComments(this.props.location.query.postID);
  }

  state = {
    open: false,
    newComment: ''
  };

  handleOpen = (changeType) => {
    if(changeType === 'NEW')
      this.setState({ newComment: '' })
    this.setState({
      changeType,
      open: true
    });
  };

  handleClose = () => {
    this.setState({open: false});
  };

  updateComment = (parentId, commentId) => {
    if(this.state.changeType === 'NEW') {
      const newComment = {
        id: crypto.randomBytes(10).toString('hex'),
        timestamp: Date.now(),
        author: 'author TBD',
        body: this.state.newComment,
        parentId
      };
      this.props.addNewComment(newComment, parentId);
    }
    else {
      const updatedComment = {
        id: this.state.commentId,
        timestamp: Date.now(),
        body: this.state.newComment
      };
      this.props.modifyComment(updatedComment, parentId);
    }
    this.handleClose();
  };

  commentChange = (ev) => {
    ev.preventDefault();
    this.setState({newComment: ev.target.value});
  };

  editComment = (ev, comment) => {
    ev.preventDefault();
    this.setState({
      commentId: comment.id,
      newComment: comment.body
    });
    this.handleOpen('UPDATE');
  };

  deleteComment = (ev, commentId, postId) => {
    ev.preventDefault();
    this.props.deleteThisComment(commentId, postId);
  };

  changeVote = (ev, type, id, change) => {
    ev.preventDefault();
    if (type === 'POST') {
      this.props.postVote(id, change);
    }
    else if (type === 'COMMENT') {
      this.props.commentVote(id, change);
    }
  };

  deletePost = (ev, postId) => {
    ev.preventDefault();
    this.props.deleteThisPost(postId, () => {
          this.props.history.push('/');
        });
  };

  render () {
    let { posts, comments } = this.props;
    const currentPostID = this.props.location.query.postID || '';
    const postToDisplay = posts.filter(post => post.id === currentPostID)[0];
    const commentsToDisplay = comments.filter(comment => comment.parentId === postToDisplay.id);

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={() => this.updateComment(currentPostID)}
      />,
    ];

    return (
      <div>
        <div className="App-header">
          <h2>Post Details Page</h2>
        </div>
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <div>
            <div>
              <Paper style={style} zDepth={3}>
                <span><b>Title:</b> {postToDisplay.title}</span>
                <br/>
                <span><b>Category:</b> {postToDisplay.category}</span>
                <span><b>Written By:</b> {postToDisplay.author}</span>
                <br/>
                <span><b>Details:</b> {postToDisplay.body}</span>
                <br/>
                <span><b>Vote:</b> <button onClick={(ev) => this.changeVote(ev, 'POST', currentPostID, 'downVote')}>-</button><button disabled>{postToDisplay.voteScore}</button><button onClick={(ev) => this.changeVote(ev, 'POST', currentPostID, 'upVote')}>+</button></span>
                <span><b>Created:</b> {JSON.stringify(new Date(postToDisplay.timestamp))}</span>
                <br/>
                <div>
                  <Link style={{textDecoration: 'none'}}
                    to={{pathname: '/modifyPost',
                         query: { post: postToDisplay }
                       }}>
                       <button>Edit</button>
                  </Link>
                  <button onClick={(ev) => this.deletePost(ev, currentPostID)}>Delete</button>
                </div>
              </Paper>
            </div>
            <div>
              <Paper style={style} zDepth={3}>
                {commentsToDisplay && commentsToDisplay.map((comment, index) => {
                  return (
                    <div key={index}>
                      <div>{comment.body}</div>
                      <div>{comment.author}</div>
                      <span><b>Vote:</b>  <button onClick={(ev) => this.changeVote(ev, 'COMMENT', comment.id, 'downVote')}>-</button><button disabled>{comment.voteScore}</button><button onClick={(ev) => this.changeVote(ev, 'COMMENT', comment.id, 'upVote')}>+</button></span>
                      <div>
                        <button onClick={(ev) => this.editComment(ev, comment)}>Edit</button>
                        <button onClick={(ev) => this.deleteComment(ev, comment.id, currentPostID)}>Delete</button>
                      </div>
                    </div>
                  )
                })}
                <button onClick={() => this.handleOpen('NEW')}>Add Comment</button>
              </Paper>
            </div>
            <Dialog
              title="Add New Comment"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              <span>Enter your comment</span>
              <input type="text" value={this.state.newComment} onChange={this.commentChange}></input>
            </Dialog>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComments: (postId) => dispatch(getComments(postId)),
    postVote: (postId, typeVote) => dispatch(votePost(postId, typeVote)),
    deleteThisPost: (postId, callback) => dispatch(deletePost(postId, callback)),
    commentVote: (commentId, typeVote) => dispatch(voteComment(commentId, typeVote)),
    addNewComment: (comment, postId) => dispatch(addCommentToPost(comment, postId)),
    modifyComment: (comment, postId) => dispatch(editCommentToPost(comment, postId)),
    deleteThisComment: (commentId, postId) => dispatch(deleteComment(commentId, postId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
