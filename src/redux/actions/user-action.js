import {client} from '../../services/api-service';
import {ActionDispatcher} from './index';
import {
  GET_MOVIES_LIST_SUCCESS,
  SET_FAVORITES_LIST,
  SET_HIDDEN_ITEMS_LIST,
} from './types';

export const getMoviesList = (searchText = 'aven') => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    let hiddenItems = getState().userState.hiddenItems;

    client
      .get(`/auto-complete?q=${searchText}`)
      .then((res) => {
        if (res.status === 200 && res?.data?.d && res?.data?.d.length > 0) {
          if (hiddenItems && hiddenItems.length > 0) {
            for (let movieItem of res.data.d) {
              for (let hiddenItem of hiddenItems) {
                if (hiddenItem.id === movieItem.id) {
                  const filteredMovies = res.data.d.filter(
                    (dataItem) => hiddenItem.id != dataItem.id,
                  );
                  console.log('filteredMovies', filteredMovies);
                  dispatch(
                    ActionDispatcher(GET_MOVIES_LIST_SUCCESS, filteredMovies),
                  );
                }
              }
            }
          } else {
            dispatch(ActionDispatcher(GET_MOVIES_LIST_SUCCESS, res.data.d));
          }
        }
        resolve(res);
      })
      .catch((err) => {
        resolve({status: 500});
        reject(err);
      });
  });

export const addToFavorite = (item) => (dispatch, getState) => {
  let favorites = getState().userState.favorites;
  favorites.push(item);
  dispatch(ActionDispatcher(SET_FAVORITES_LIST, favorites));
};

export const removeFromFavorite = (item) => (dispatch, getState) => {
  let favorites = getState().userState.favorites;
  const filteredFavorites = favorites.filter(
    (favItem) => item.id != favItem.id,
  );
  dispatch(ActionDispatcher(SET_FAVORITES_LIST, filteredFavorites));
};

export const addToHiddenItems = (item) => (dispatch, getState) => {
  let hiddenItems = getState().userState.hiddenItems;
  let moviesList = getState().userState.moviesList;
  hiddenItems.push(item);
  dispatch(ActionDispatcher(SET_HIDDEN_ITEMS_LIST, hiddenItems));
  const filteredMovies = moviesList.filter(
    (movieItem) => item.id != movieItem.id,
  );
  dispatch(ActionDispatcher(GET_MOVIES_LIST_SUCCESS, filteredMovies));
};

export const removeFromHiddenItems = (item) => (dispatch, getState) => {
  let hiddenItems = getState().userState.hiddenItems;
  let moviesList = getState().userState.moviesList;
  const filteredHiddenItems = hiddenItems.filter(
    (favItem) => item.id != favItem.id,
  );
  dispatch(ActionDispatcher(SET_HIDDEN_ITEMS_LIST, filteredHiddenItems));
  moviesList.push(item);
  dispatch(ActionDispatcher(GET_MOVIES_LIST_SUCCESS, moviesList));
};
