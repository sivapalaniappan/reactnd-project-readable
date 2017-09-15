import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class CategoryList extends Component {
  render() {
    const { categories } = this.props;

    return (
      <div className='category-list'>
        {categories && categories.map((category, index) => {
          return (
            <Link key={index} to={`/category/${category.path}`}>
              <div>{category.name}</div>
            </Link>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state = {}) {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps)(CategoryList);
