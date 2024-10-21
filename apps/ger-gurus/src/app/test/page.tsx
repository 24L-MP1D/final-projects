'use client';

import { useEffect, useState } from 'react';

type Data = {
  _id: string;
  productName: string;
};

export default function Index() {
  const [data, setData] = useState<Data[]>([]);
  console.log({ data });

  useEffect(() => {
    fetch(`/api/category`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      Test
      {data.map((data) => (
        <div key={data._id}>{data.productName}</div>
      ))}
    </div>
  );
}
