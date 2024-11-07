import axios from 'axios';

export function fetcher() {
  const instance = axios.create({
    headers: {
      authtoken: typeof localStorage !== 'undefined' ? localStorage.getItem('authtoken') : '',
      userId: typeof localStorage !== 'undefined' ? localStorage.getItem('userId') : '',
    },
  });

  return instance;
}
