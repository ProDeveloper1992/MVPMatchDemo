import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import userState from './user-state';
import {ActionDispatcher} from '../actions';
import {navigate} from '../../navigator/root-navigation';

// export const LOGOUT_USER = 'LOGOUT_USER';

const allReducers = combineReducers({
  userState: userState,
});

export const logoutUser = () => (dispatch, getState) =>
  dispatch(ActionDispatcher(LOGOUT_USER));

const rootReducer = (state, action) => {
  //   if (action.type === LOGOUT_USER) {
  //     Object.keys(state).forEach(key => {
  //       AsyncStorage.removeItem(`persist:${key}`);
  //     });
  //     navigate('auth-stack');
  //     state = undefined;
  //   }
  return allReducers(state, action);
};

export default rootReducer;
