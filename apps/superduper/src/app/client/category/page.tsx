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
      <div>Ангилалууд</div>
    <div className="container mx-auto flex gap-8">

      <div>
        <div className="bg-sky-100 h-40 w-96 rounded-sm items-center">Электроник</div>
        <div className="bg-sky-200 h-40 w-96 rounded-sm">Урлаг ба цуглуулга</div>
        <div className="bg-sky-300 h-40 w-96 rounded-sm">Загвар ба дагалдах хэрэгсэл</div>
      </div>
      <div>
        <div className="bg-sky-400 h-40 w-96 rounded-sm">Үнэт эдлэл ба цаг</div>
        <div className="bg-sky-500 h-40 w-96 rounded-sm">Aвтомашинууд</div>
        <div className="bg-sky-600 h-40 w-96 rounded-sm">Үл хөдлөх хөрөнгө</div>
      </div>
      <div>
        <div className="bg-sky-700 h-40 w-96 rounded-sm">Тавилга ба гэрийн чимэглэл</div>
        <div className="bg-sky-800 h-40 w-96 rounded-sm">Спортын дурсгалт зүйлс</div>
        <div className="bg-sky-900 h-40 w-96 rounded-sm">Ном ба гар бичмэл</div>
      </div>
    </div>
    </div>
  
  );
}
