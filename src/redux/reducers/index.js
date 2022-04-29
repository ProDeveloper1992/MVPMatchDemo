import {combineReducers} from 'redux';
import userState from './user-state';
import {ActionDispatcher} from '../actions';

const allReducers = combineReducers({
  userState: userState,
});

export const logoutUser = () => (dispatch, getState) =>
  dispatch(ActionDispatcher(LOGOUT_USER));

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;
