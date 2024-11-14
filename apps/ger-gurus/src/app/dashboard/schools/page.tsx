'use client';

import { fetcher } from '@/lib/fetcher';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Page() {
  const [schools, setSchools] = useState();
  console.log(schools);
  async function getSchools() {
    try {
      const response = await fetcher().get(`api/schools`);
      setSchools(response.data);
    } catch (error) {
      toast.error('Something went wrong');
    }
  }
  useEffect(() => {
    getSchools();
  }, []);

  return <main> Schools that you own</main>;
}
