import axios from 'axios';

export function fetcher() {
  const instance = axios.create({
    headers: {
      Authorization: typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : '',
    },
  });

  return instance;
}
