'use client';

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Page() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  function Submit() {
    axios
      .put('/api/otp', { email })
      .then(({ data, status, statusText }) => {
        if (status === 200) {
          toast('Signed In Successfully!');
        } else {
        }
        console.log(data);
        setLoading(false);
      })
      .catch(({ message }) => {
        toast(message);
        console.log(message);
      });
  }
  return (
    <div>
      <div className=" container mx-auto w-[500px] border-2 rounded-lg mt-[50px] flex flex-col gap-6">
        <p className="text-[24px] font-bold mt-8">Reset your password</p>
        <p>Enter your email address and press the SEND button to request a new password. You will receive an email with your new password within five minutes.</p>
        <div>
          <input onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="border-2 bg-slate-50 rounded-3xl w-full p-3" />
        </div>
        <Button className="bg-blue-500 mb-8" onClick={Submit}>
          Send
        </Button>
      </div>
    </div>
  );
}
