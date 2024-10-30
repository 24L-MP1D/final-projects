'use client';
import { useEffect, useState } from 'react';

type category = {
  category: string;
  _id: string;
};

export default function Page() {
  const [category, setCategory] = useState<category[]>([]);

  async function cat() {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategory(data);
    } catch (error) {
      console.log('error');
    }
  }

  useEffect(() => {
    cat();
  }, []);

  return (
    <div>
      <div className="flex gap-4">
        {category.map((cat) => (
          <div key={cat._id}>{cat.category}</div>
        ))}
      </div>
    </div>
  );
}
