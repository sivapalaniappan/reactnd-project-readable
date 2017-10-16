import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import crypto from 'crypto';
import _ from 'lodash';

import { addPost } from '../actions/postActions';

const style = {
  height: 'auto',
  width: 'auto',
  margin: 20,
  padding: 20,
  textAlign: 'justify',
  display: 'inline-block',
};

class ModifyPostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postTitle: '',
      postCategory: '',
      postBody: '',
      postAuthor: ''
    };
  }

  componentWillMount() {
    const postToModify = _.get(this, 'props.location.query.post');
    if (postToModify) {
      this.setState({
        postTitle: postToModify.title,
        postCategory: postToModify.category,
        postBody: postToModify.body,
        postAuthor: postToModify.author
      });
    }
  }

  setInitialState = (postTitle='', postCategory='', postBody='', postAuthor='') => {
    this.setState({
      postTitle,
      postCategory,
      postBody,
      postAuthor
    });
  };

  addThisPost = (ev) => {
    ev.preventDefault();
    const post = {
      id: crypto.randomBytes(10).toString('hex'),
      timestamp: Date.now(),
      title: this.state.postTitle,
      category: this.state.postCategory,
      body: this.state.postBody,
      author: this.state.postAuthor
    };
    this.props.addNewPost(post);
  };

  updateState = (ev, type) => {
    ev.preventDefault();
    switch (type) {
      case 'TITLE':
        this.setState({ postTitle: ev.target.value });
        break;
      case 'CATEGORY':
        this.setState({ postCategory: ev.target.value });
        break;
      case 'BODY':
        this.setState({ postBody: ev.target.value });
        break;
      case 'AUTHOR':
        this.setState({ postAuthor: ev.target.value });
        break;
      case 'CLEAR':
        this.setInitialState();
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div>
        <div className="App-header">
          <h2>Add/Edit Post Page</h2>
        </div>
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <div>
            <Paper style={style} zDepth={3}>
              <span><b>Title:</b> <input type="text" value={this.state.postTitle} onChange={(ev) => this.updateState(ev, 'TITLE')}/></span>
              <br/>
              <span><b>Category:</b> <input type="text" value={this.state.postCategory} onChange={(ev) => this.updateState(ev, 'CATEGORY')}/></span>
              <br/>
              <span><b>Details:</b> <input type="text" value={this.state.postBody} onChange={(ev) => this.updateState(ev, 'BODY')}/></span>
              <br/>
              <span><b>Written By:</b> <input type="text" value={this.state.postAuthor} onChange={(ev) => this.updateState(ev, 'AUTHOR')}/></span>
              <br/>
              <div>
                <button onClick={(ev) => this.updateState(ev, 'CLEAR')}>Clear</button>
                <button onClick={this.addThisPost}>Save</button>
              </div>
            </Paper>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    addNewPost: (post) => dispatch(addPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyPostView);
