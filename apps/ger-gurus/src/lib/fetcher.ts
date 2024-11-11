import axios from 'axios';

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

export function fetcher() {
  const instance = axios.create({
    headers: {
      authtoken: getCookie('authtoken') || '',
      userId: getCookie('userId') || '',
    },
  });
  return instance;
}