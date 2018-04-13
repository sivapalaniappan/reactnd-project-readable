import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';

const style = {
  height: 'auto',
  width: 'auto',
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

class CategoryList extends Component {

  render() {
    const { categories } = this.props;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Paper style={style} zDepth={3}>
          <List style={{width: 450}}>
            {categories && categories.map((category, index) => {
              return (
                <Link key={index} style={{textDecoration: 'none'}} to={`/${category.path}`}>
                  <ListItem primaryText={category.name} />
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
    categories: state.categories
  }
}

export default withRouter(connect(mapStateToProps)(CategoryList));
