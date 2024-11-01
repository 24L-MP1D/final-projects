'use client';

import { AdminLayout } from '@/components/adminLayout';
import { useContext, useEffect } from 'react';
import { Context } from '../layout';

// import Header from "@/components/header";
// import LeftBar from "@/components/leftBar";

const Home = () => {
  const value = useContext(Context);
  const approveSell = () => {
    console.log('Successfully approved the Sell request');
  };

  const rejectSell = () => {
    console.log('Rejected the Sell request');
  };
  useEffect(() => {
    value?.setLayoutAside('Dashboard');
  }, []);
  return (
    <AdminLayout>
      <div className="container mx-auto flex flex-col gap-30">
        <h1>
          <div className="container mx-auto flex flex-col padding-30">
            {' '}
            Hello there 👋, <br /> Welcome to the client accepting dashboard{' '}
          </div>
        </h1>
        <button className="border-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" onClick={approveSell}>
          Approve the seller's request
        </button>

        <br />
        <button className="border-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg" onClick={rejectSell}>
          Reject the seller's request
        </button>
      </div>
    </AdminLayout>
  );
};
export default Home;
