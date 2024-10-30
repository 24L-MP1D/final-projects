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
    <h1>Categories</h1>
    </div> 
    
    <div className="container mx-auto flex gap-4">
    <div className="bg-sky-300 h-48 w-96 rounded-sm">Classical art</div>
    <div className="bg-sky-400 h-48 w-96 rounded-sm">Classical art</div>
    <div className="bg-sky-500 h-48 w-96 rounded-sm">Classical art</div>
    <div className="bg-sky-600 h-48 w-96 rounded-sm">Classical art</div>
    <div className="bg-sky-700 h-48 w-96 rounded-sm">Classical art</div>
    <div className="bg-sky-800 h-48 w-96 rounded-sm">Classical art</div>
    <div className="bg-sky-900 h-48 w-96 rounded-sm">Classical art</div>
      </div>
    </div>
  
  );
}
