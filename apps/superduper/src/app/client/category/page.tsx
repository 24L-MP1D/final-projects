'use client';
import { Button } from '@/components/ui/button';
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
      <div className='block'>Ангилалууд</div>
    <div className="container grid-flow-col m-7 justify-center">
        <Button className="bg-sky-200 h-40 w-96 rounded-sm m-2" value="Электроник">Электроник</Button>
        <Button className="bg-sky-200 h-40 w-96 rounded-sm m-2" value="Урлаг ба цуглуулга">Урлаг ба цуглуулга</Button>
        <Button className="bg-sky-300 h-40 w-96 rounded-sm m-2" value="Загвар ба дагалдах хэрэгсэл">Загвар ба дагалдах хэрэгсэл</Button>
        <Button className="bg-sky-400 h-40 w-96 rounded-sm m-2" value="Үнэт эдлэл ба цаг">Үнэт эдлэл ба цаг</Button>
        <Button className="bg-sky-500 h-40 w-96 rounded-sm m-2" value="Aвтомашинууд">Aвтомашинууд</Button>
        <Button className="bg-sky-600 h-40 w-96 rounded-sm m-2" value="Үл хөдлөх хөрөнгө">Үл хөдлөх хөрөнгө</Button>
        <Button className="bg-sky-700 h-40 w-96 rounded-sm m-2" value="Тавилга ба гэрийн чимэглэл">Тавилга ба гэрийн чимэглэл</Button>
        <Button className="bg-sky-800 h-40 w-96 rounded-sm m-2" value="Спортын дурсгалт зүйлс">Спортын дурсгалт зүйлс</Button>
        <Button className="bg-sky-900 h-40 w-96 rounded-sm m-2" value="Ном ба гар бичмэл">Ном ба гар бичмэл</Button>
    </div>
    </div>
  );
}
