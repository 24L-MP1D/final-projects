'use client';

import axios from 'axios';
import { decode } from 'jsonwebtoken';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';

const Page = () => {
  const [tiers, setTiers] = useState([]);
  const [userRole, setUserRole] = useState<string | null>(null);

  const getTiers = async () => {
    const res = await axios.get('/api/tiers');
    setTiers(res.data);
  };

  const getUserRole = () => {
    const token = localStorage.getItem('authtoken') || '';
    const { role } = (decode(token) as { role: string }) || '';
    setUserRole(role);
  };

  useEffect(() => {
    getTiers();
    getUserRole();
  }, []);

  return (
    <div className="flex gap-4 h-[60vh] items-center justify-center">
      {tiers.map((tier, index) => (
        <CustomCardForSubscription role={userRole} data={tier} key={`subscription${index}`} />
      ))}
    </div>
  );
};

const CustomCardForSubscription = ({ data, role }: { role: string | null; data: { name: string; price: number; benefits: string[]; _id: any } }) => {
  const { name, price, benefits, _id } = data;
  const isActiveRole = role === name;
  return (
    <Card className="p-6 h-full max-h-[320px] flex flex-col justify-between rounded-lg shadow-lg border border-gray-200 bg-white">
      <CardHeader className="pb-2 border-b border-gray-100">
        <CardTitle>
          <span className="text-2xl font-bold text-gray-800">{name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="py-4">
        <ul className="list-disc space-y-2 text-gray-700 pl-5">
          {benefits.map((ele, index) => (
            <li key={`${name}${index}`} className="text-sm">
              {ele}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-4 border-t border-gray-100 flex flex-col gap-2">
        {isActiveRole && <div><span className='text-2xl font-bold'>Идэвхжсэн</span></div> || (
          <>
            <span className="text-xl font-semibold text-gray-900">{price}₮</span>
            <Button onClick={() => {}} className="w-full">
              Авах
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

const gotToBuySub = () => {
  return;
};

export default Page;
