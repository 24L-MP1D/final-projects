import axios from 'axios';
import { useEffect, useState } from 'react';
import { HandyCarousel } from './handyCarousel';

export function FavoriteRecipes() {
  const token = localStorage.getItem('authtoken');
  if (!token) {
    return null;
  }
  const [data, setData] = useState([]);
  const getFavorite = async () => {
    const res = await axios.get('/api/favorite', { headers: { authtoken: token } });
    setData(res.data);
  };
  console.log(data);
  useEffect(() => {
    getFavorite();
  }, []);
  return (
    <div>
      <p className="text-xl h-full font-semibold">Favorite</p>
      <HandyCarousel data={data} name="favorite" />
    </div>
  );
}
