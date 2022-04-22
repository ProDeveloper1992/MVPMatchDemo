import {GET_MOVIES_LIST_SUCCESS, SET_FAVORITES_LIST} from '../actions/types';

const initialState = {
  moviesList: [],
  favorites: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES_LIST_SUCCESS:
      console.log('GET_MOVIES_LIST_SUCCESS', action.payload);
      return {
        ...state,
        moviesList: action.payload,
      };

    case SET_FAVORITES_LIST:
      console.log('SET_FAVORITES_LIST', action.payload);
      return {
        ...state,
        favorites: action.payload,
      };

    default:
      return state;
  }
}
