import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import CategoryView from './categoryView';
import PostDetailView from './postDetailView';
import DefaultView from './defaultView';
import ModifyPostView from './modifyPostView';

class App extends Component {
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

export default withRouter(App);
