'use client';

import { Button } from '@/components/ui/button';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

export default function Page() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  function Submit() {
    setLoading(true);
    axios
      .put('/api/forgotPassword/email', { email })
      .then(({ data, status, statusText }) => {
        localStorage.setItem('email', JSON.stringify(data.email));
        if (status === 200) {
          toast('Check your e-mail!');
          window.location.href = '/client/forgotten-otp';
        } else {
          status === 404;
          toast('This e-mail does not registered!');
        }
        setLoading(false);
      })
      .catch(({ message }) => {
        toast(message);
        console.log(message);
        setLoading(false);
      });
  }

  return (
    <div>
      <div className=" container mx-auto w-[500px] border-2 rounded-lg mt-[50px] flex flex-col gap-6">
        <p className="text-[24px] font-bold mt-8">Enter your e-mail address</p>
        <p>Enter your email address and press the SEND button. You will receive an email with OTP number in five minutes.</p>
        <div>
          <input onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="border-2 bg-slate-50 rounded-3xl w-full p-3" />
        </div>
        <Button className="bg-blue-500 mb-8 disabled:cursor-not-allowed" onClick={Submit} disabled={loading}>
          {loading && <Image src={'/images/spinner.svg'} alt="a" width={40} height={40} />}
          <div>Send</div>
        </Button>
        <Toaster />
      </div>
    </div>
  );
}
