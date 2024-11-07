'use client';

import { Button } from './ui/button';
function logout() {
  localStorage.removeItem('accesstoken');
  setTimeout(() => {
    window.location.href = '/login';
  }, 1000);
}
export function Logout() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-24">
      <div className="text-7xl font-bold">404</div>
      <div className="text-lg font-medium">Сайн байна уу. Та энэ хуудас руу нэвтрэх эрхгүй байна!</div>
      <Button onClick={() => logout()}>Гарах</Button>;
    </div>
  );
}
