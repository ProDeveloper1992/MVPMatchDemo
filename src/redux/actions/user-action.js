import {client} from '../../services/api-service';
import {ActionDispatcher} from './index';
import {GET_MOVIES_LIST_SUCCESS} from './types';

export const getMoviesList = (searchText = 'aven') => (dispatch) =>
  new Promise(function (resolve, reject) {
    client
      .get(`/auto-complete?q=${searchText}`)
      .then((res) => {
        if (res.status === 200 && res?.data?.d && res?.data?.d.length > 0) {
          dispatch(ActionDispatcher(GET_MOVIES_LIST_SUCCESS, res.data.d));
        }
        resolve(res);
      })
      .catch((err) => {
        resolve({status: 500});
        reject(err);
      });
  });
