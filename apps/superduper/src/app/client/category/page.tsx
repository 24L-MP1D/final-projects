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
      <div>Categories</div>
    <div className="container mx-auto flex gap-8">

      <div>
        <div className="bg-sky-100 h-40 w-96 rounded-sm items-center">Art</div>
        <div className="bg-sky-200 h-40 w-96 rounded-sm">Fashion</div>
        <div className="bg-sky-300 h-40 w-96 rounded-sm">Sports</div>
      </div>
      <div>
        <div className="bg-sky-400 h-40 w-96 rounded-sm">Music, Movies & Cameras</div>
        <div className="bg-sky-500 h-40 w-96 rounded-sm">Jewellery & Precious Stones</div>
        <div className="bg-sky-600 h-40 w-96 rounded-sm">Trading Cards</div>
      </div>
      <div>
        <div className="bg-sky-700 h-40 w-96 rounded-sm">Interiors & Decorations</div>
        <div className="bg-sky-800 h-40 w-96 rounded-sm">Toys & Models</div>
        <div className="bg-sky-900 h-40 w-96 rounded-sm">Books & Historical Memorabilia</div>
      </div>
    </div>
    </div>
  
  );
}
