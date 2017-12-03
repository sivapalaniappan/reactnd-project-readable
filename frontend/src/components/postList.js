import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Moment from 'moment';

const style = {
  height: 'auto',
  width: 'auto',
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

class PostList extends Component {
  componentWillMount() {
    this.setState({ sort: 'scoreDesc' });
  }

  sortAscending (a, b) {
    if (a < b)
      return -1;
    if (a > b)
      return 1;
    return 0;
  }

  sortDescending(a, b) {
    if (a > b)
      return -1;
    if (a < b)
      return 1;
    return 0;
  }

  render() {
    let { posts } = this.props;
    const { categoryPath = '' } = this.props;

    if(categoryPath && categoryPath !== 'All') {
      posts = posts.filter(post => post.category === categoryPath )
    }

    switch(this.state.sort) {
      case ('scoreAsc') :
        posts.sort((a,b) => this.sortAscending(a.voteScore, b.voteScore));
        break;

      case ('scoreDesc') :
        posts.sort((a,b) => this.sortDescending(a.voteScore, b.voteScore));
        break;

      case ('createdAsc') :
        posts.sort((a,b) => this.sortAscending(a.timestamp, b.timestamp));
        break;

      case ('createdDesc') :
        posts.sort((a,b) => this.sortDescending(a.timestamp, b.timestamp));
        break;

      default:
        break;
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Paper style={style} zDepth={3}>
          <List style={{width: 600}}>
            <SelectField
              floatingLabelText="Sort"
              value={this.state.sort}
              onChange={(event, index, value) => this.setState({ sort: value })}
            >
              <MenuItem value={'scoreDesc'} primaryText="Score High to Low" />
              <MenuItem value={'scoreAsc'} primaryText="Score Low to High" />
              <MenuItem value={'createdDesc'} primaryText="Created Recent to Older" />
              <MenuItem value={'createdAsc'} primaryText="Created Older to Recent" />
            </SelectField>
            <Link style={{textDecoration: 'none'}}
              to={{pathname: '/modifyPost',
                   query: { postID: 'newPost' }
                 }}>
              <FloatingActionButton backgroundColor='white' style={{marginLeft: 100}}>
                <ContentAdd />
              </FloatingActionButton>
            </Link>
            {posts && posts.map((post, index) => {
              return (
                <Link key={index} style={{textDecoration: 'none'}}
                  to={{pathname: '/postDetail',
                       query: { postID: post.id }
                     }}>
                  <ListItem
                    primaryText={post.title}
                    secondaryText={
                      <div>
                        <b>Author:</b> {post.author} <b>Score:</b> {post.voteScore} <b>Category:</b> {post.category} <b>Created:</b> {Moment(post.timestamp).format("DD MMM YYYY hh:mm a")}
                      </div>
                    }
                    secondaryTextLines={1}
                  />
                  <Divider />
                </Link>
              );
            })}
          </List>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

export default withRouter(connect(mapStateToProps)(PostList));
