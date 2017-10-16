import { SET_CATEGORIES } from '../actions/categoryActions';

const initialState = {
  categories: []
};

export default (state = initialState, action) => {
  const { categories = [] } = action;

  switch (action.type) {
    case SET_CATEGORIES:
    console.log('inside reduceer');
    console.log(categories);
      return [
        ...state,
        ...categories
      ]
    default:
      return [...state];
  }
}
