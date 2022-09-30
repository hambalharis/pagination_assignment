import {API} from '../utils/ApiEndpoints';

const header = () => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
};

export const getData = () => {
  return fetch(API.BaseUrl, {
    method: 'get',
    headers: header(),
  });
};
