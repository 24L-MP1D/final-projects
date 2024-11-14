'use client';

import { fetcher } from '@/lib/fetcher';
import { PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
interface Schools {
  ownerName: string;
  domain: string;
  _id: string;
}

export default function Page() {
  const [schools, setSchools] = useState<Schools[]>();
  const router = useRouter();
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


  const handleRedirect = () => {
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="prose flex items-center justify-center flex-col gap-4">
        <h1> Сайн уу ? {schools?.[0].ownerName}</h1>
        <h1>Та эдгээр сайтуудыг эзэмшиж байна.</h1>
        <div className="grid grid-cols-2 gap-4">
          {schools?.map((school, index) => (
            <Link href={`https://${school.domain}`} key={school._id}>
              <div className="mockup-browser border-base-300 border max-w-[400px]">
                <div className="mockup-browser-toolbar">
                  <div className="input border-base-300 border">{school.ownerName}</div>
                </div>
                <div className="border-base-300 flex justify-center border-t px-4 py-16">{school.domain}</div>
              </div>
            </Link>
          ))}
        </div>

        <button className="btn btn-primary" onClick={handleRedirect}>
          Шинэ вебсайт нээх <PlusCircleIcon />
        </button>
      </div>
    </div>
  );

}
