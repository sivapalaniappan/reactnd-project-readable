import * as api from '../utils/api';

export const SET_CATEGORIES = 'SET_CATEGORIES';

export const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories: categories
});

export const getCategories = () => dispatch => (
  api.getCategories().then(res => dispatch(setCategories(res.categories)))
)
