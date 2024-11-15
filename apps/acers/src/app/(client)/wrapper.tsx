'use client';

import { decode } from 'jsonwebtoken';
import { useEffect, useState } from 'react';

export default function TextBackground() {
  const [userRole, setUserRole] = useState<string>('');

  const bg = () => {
    const token = localStorage.getItem('authtoken') || '';

    if (!token) {
      setUserRole('');
    } else {
      try {
        const decoded: any = decode(token);
        if (decoded?.role) {
          setUserRole(decoded.role);
        } else {
          setUserRole('');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserRole('');
      }
    }
  };

  useEffect(() => {
    bg();
  }, []);

  const getBgColor = (role: string) => {
    switch (role) {
      case 'Gold':
        return 'bg-gradient-to-r from-[#ffd700] via-[#fdb813] to-[#ffd700] p-4 rounded-lg shadow-xl text-black text-[23px]';
      case 'Silver':
        return 'bg-gradient-to-r from-[#c0c0c0] via-[#a0a0a0] to-[#c0c0c0] p-4 rounded-lg shadow-xl text-black text-[23px]';
      case 'Bronze':
        return 'bg-gradient-to-r from-[#cd7f32] via-[#8b572a] to-[#cd7f32] p-4 rounded-lg shadow-xl text-white text-[23px]';
      default:
        return '';
    }
  };

  return (
    <div>
      {userRole === 'Gold' && <p className={getBgColor('Gold')}>Gold хэрэглэгчдэд</p>}
      {userRole === 'Silver' && <p className={getBgColor('Silver')}>Silver хэрэглэгчдэд</p>}
      {userRole === 'Bronze' && <p className={getBgColor('Bronze')}>Bronze хэрэглэгчдэд</p>}
    </div>
  );
}
