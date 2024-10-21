'use client';

import { Category } from '@/lib/types';
import { useEffect, useState } from 'react';

export default function Index() {
  const [categories, setCategoies] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategoies(data);
      });
  }, []);

  return (
    <div>
      {categories.map((category) => (
        <div key={category._id}>{category.name}</div>
      ))}
    </div>
  );
}
