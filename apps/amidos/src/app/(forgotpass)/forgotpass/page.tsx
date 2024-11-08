'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';

export default function ForgotPassword() {
  const [recoveryemail, setRecoveryemail] = useState('');
  const [loading, setLoading] = useState(false);
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setRecoveryemail(event.target.value);
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validemail = emailRegex.test(recoveryemail);

  function submit() {
    setLoading(true);
    localStorage.setItem(`otpemail`, recoveryemail);

    axios
      .post('/api/admin/otpsend', { email: recoveryemail })
      .then((res) => {
        if (res.status === 200) {
          toast.success(`Баталгаажуулах код амжилттай илгээгдлээ.`);
          setTimeout(() => {
            (window as Window).location = '/otp';
          }, 1000);
          setLoading(false);
        }
      })
      .catch(function (error) {
        if (error.status === 401) {
          setRecoveryemail('');
          toast.error(`${recoveryemail} хаяг бүртгэлгүй байна.`);
          setLoading(false);
        } else {
          toast.error('Алдаа гарлаа дахин оролдоно уу');
          setLoading(false);
        }
      });
  }
  return (
    <div className="max-w-[334px] mx-auto grid gap-5 py-20">
      <h1 className="text-center text-[#09090B] text-xl font-semibold">Нууц үг сэргээх</h1>
      <Input type="email" placeholder="Имэйл хаяг оруулах" className="w-full rounded-full" onChange={handleChange} value={recoveryemail} />
      <Button className="w-full bg-[#52071B]  hover:bg-[#8B0000] rounded-full disabled:opacity-30" onClick={() => submit()} disabled={!validemail}>
        {loading ? <span className="loading loading-spinner loading-md text-white">Уншиж байна...</span> : <span className="text-red">Илгээх</span>}
      </Button>
    </div>
  );
}
