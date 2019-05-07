import { combineReducers } from 'redux';
import cookieReducer from './cookieReducer';
import selectionsReducer from './selectionsReducer';

export default combineReducers({
  cookieReducer,
  selectionsReducer
});

