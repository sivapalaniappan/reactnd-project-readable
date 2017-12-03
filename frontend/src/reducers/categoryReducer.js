import { SET_CATEGORIES } from '../actions/categoryActions';

const initialState = {
  categories: []
};

export default (state = initialState, action) => {
  const { categories = [] } = action;

  switch (action.type) {
    case SET_CATEGORIES:
      return [...categories];
    default:
      return [...state];
  }
}
