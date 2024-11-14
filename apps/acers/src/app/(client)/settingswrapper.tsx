'use client';

import { decode } from 'jsonwebtoken';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import * as img3 from './img/bronze-medal.png';
import * as img1 from './img/gold-medal.png';
import * as img2 from './img/silver-medal.png';

export default function ThemeBackground() {
  const [image, setImage] = useState<string>('bg-black');

  const bg = () => {
    const token = localStorage.getItem('authtoken') || '';
    if (!token) {
      setImage('bg-black');
    } else {
      try {
        const decoded: any = decode(token);
        if (decoded?.role) {
          switch (decoded.role) {
            case 'Gold':
              setImage('gold-medal-bg');
              break;
            case 'Silver':
              setImage('silver-medal-bg');
              break;
            case 'Bronze':
              setImage('bronze-medal-bg');
              break;
            default:
              setImage('bg-black');
              break;
          }
        } else {
          setImage('bg-black');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setImage('bg-black');
      }
    }
  };

  useEffect(() => {
    bg();
  }, []);

  return (
    <div className={image}>
      {image === 'gold-medal-bg' && <Image src={img1} alt="Gold Medal" width={76} height={76} />}
      {image === 'silver-medal-bg' && <Image src={img2} alt="Silver Medal" width={76} height={76} />}
      {image === 'bronze-medal-bg' && <Image src={img3} alt="Bronze Medal" width={76} height={76} />}
    </div>
  );
}
