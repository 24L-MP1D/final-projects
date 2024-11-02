'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';

export default function ForgotPassword() {
  const [recoveryemail, setRecoveryemail] = useState('');
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setRecoveryemail(event.target.value);
  }

  function submit() {
    localStorage.setItem(`otpemail`, JSON.stringify(recoveryemail));
    axios.post('/api/admin/otpsend', { email: recoveryemail }).then((res) => {
      if (res.status === 200) {
        (window as Window).location = '/otp';
      } else if (res.status === 401) {
        (window as Window).location = '././signup';
      } else {
        (window as Window).location = '/forgotpass';
      }
    });
  }
  return (
    <div className="max-w-[334px] mx-auto grid gap-5 py-20">
      <h1 className="text-center text-[#09090B] text-xl font-semibold">Нууц үг сэргээх</h1>
      <Input type="email" placeholder="Имэйл хаяг оруулах" className="w-full rounded-full" onChange={handleChange} />
      <Button className="w-full bg-[#2563EB] rounded-full" onClick={() => submit()}>
        Илгээх
      </Button>
    </div>
  );
}
