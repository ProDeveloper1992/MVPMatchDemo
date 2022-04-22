import {client} from '../../services/api-service';

export const getAllMovies = () => (dispatch) =>
  new Promise(function (resolve, reject) {
    client
      .get(`/posts`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        resolve({status: 500});
        reject(err);
      });
  });
