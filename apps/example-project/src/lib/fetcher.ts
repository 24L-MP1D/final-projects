import axios from 'axios';

export function fetcher() {
  const instance = axios.create({
    headers: {
      authorization: typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : '',
    },
  });

  return instance;
}
