'use client';
import { Orders } from '@/app/admin/successfullorder/page';
import axios from 'axios';
import Link from 'next/link';
import * as React from 'react';
import { toast } from 'sonner';

export default function Successfullorder({ params }: { params: { id: string } }) {
  const [oneOrder, setOneorder] = React.useState<Orders>();
  const [successotp, setSuccessotp] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const otp = localStorage.getItem('successotp');
    setSuccessotp(otp ? otp : '');
  }, []);

  const navs = [
    { name: 'БИДНИЙ ТУХАЙ', link: '/' },
    { name: 'MЕНЮ', link: '/menu' },
    { name: 'ГАЛЛЕРЕЙ', link: '/gallery' },
    { name: 'ЗАХИАЛГА', link: '/order' },
    { name: 'ХҮРГЭЛТ', link: '/delivery' },
  ];

  const id = params.id;

  function renderorder() {
    setLoading(true);
    axios
      .get(`/api/admin/successfullorder/${id}`)
      .then((res) => setOneorder(res.data))
      .catch(function (error) {
        toast.error('Алдаа гарлаа');
      })
      .finally(() => setLoading(false));
  }
  React.useEffect(() => {
    renderorder();
  }, []);
  return (
    <>
      {' '}
      {loading ? (
        <span className="loading loading-dots loading-md"></span>
      ) : (
        <>
          <div className="flex bg-black gap-4 justify-center p-6 w-full">
            {navs.map((nav) => (
              <Link className="text-white" key={nav.name} href={nav.link}>
                {nav.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-6 text-center justify-center items-center py-56">
            <div className="flex flex-col gap-3">
              <p className="text-4xl text-green-700 font-bold ">Таны захиалга амжилттай баталгаажлаа!</p>
              <div>
                <p className="text-2xl text-black mb-9">Таны захиалгын дугаар</p>
                <span className="bg-green-700 p-2 text-white font-bold text-lg rounded-sm">{successotp}</span>
              </div>
            </div>
            <div className="max-w-[500px] text-balance pt-9">
              <div>
                {oneOrder?.deliveryperson
                  ? `Хүргэлтийн ажилтан хувиарлагдсан байна. Хүргэлтийн ажилтантай ${oneOrder?.deliveryperson} дугаараар холбогдоно уу.`
                  : 'Хүргэлтийн ажилтан тун удахгүй хувиарлагдах болно. Та түр хүлээнэ үү.'}
              </div>
              <Link href={`http://localhost:3000/deliverytracker/${oneOrder?.id}`} className="underline text-green-900 ">
                ХҮРГЭЛТИЙН АЖИЛТНЫ БАЙРШЛЫГ ХАРАХ
              </Link>
            </div>
            <p className="text-2xl text-black font-semibold pt-2">AMIDO'S-г сонгон үйлчлүүлсэн таньд баярлалаа</p>
          </div>
        </>
      )}
    </>
  );
}
