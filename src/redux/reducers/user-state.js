import {USER_LOGIN_SUCCESS} from '../actions/types';

const initialState = {
  userData: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
      };

    default:
      return state;
  }
}
