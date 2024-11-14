'use client';

import '@/components/styles.css';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { CircleAlert, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';

export default function Index() {
  const [step, setStep] = useState('1');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const ShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const ShowPasswordConfirm = () => {
    setShowPasswordConfirm((prev) => !prev);
  };
  const passwordsAreSame = password === passwordConfirm && password !== '';
  const emailIsValid = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(email);

  const [nameConfirm, setNameConfirm] = useState(false);
  const [nameLengthConfirm, setNameLengthConfrim] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState(false);
  const [emailValidConfirm, setEmailValidConfirm] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [passwordLengthConfirm, setPasswordLengthConfirm] = useState(false);
  const [passwordConfirmEmpty, setPasswordConfirmEmpty] = useState(false);
  const [invalidOtp, setInvalidOtp] = useState(false);

  async function mail() {
    try {
      const { status } = await axios.post(
        '/api/mail',
        { email },
        {
          validateStatus: (status) => {
            return status >= 200 && status < 500;
          },
        }
      );
      if (status === 200) {
        return sendCode();
      } else {
        return toast.error('Имэйл хаяг бүртгэлтэй байна.', { className: 'custom-toast error' });
      }
    } catch (error) {}
  }

  function sendCode() {
    try {
      fetch('/api/otp', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });
      setStep('2');
    } catch (error) {
      console.log(error);
    }
  }
  async function verify() {
    try {
      setLoading(true);
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        body: JSON.stringify({ email, otp }), // Use the passed otp
        headers: { 'Content-Type': 'application/json' },
      });
      setLoading(false);
      if (res.ok) {
        submit();
      } else if (res.status === 404) {
        setInvalidOtp(true);
      }
    } catch (error) {
      console.error('Verification error:', error);
      setLoading(false);
    }
  }
  function finsih() {
    window.history.go(-1);
  }
  function last() {
    window.location.href = `https://dash.verse.mn`;
  }

  function next() {
    if (!name) setNameConfirm(true);
    if (!email) setEmailConfirm(true);
    if (!password) setPasswordEmpty(true);
    if (!passwordConfirm) setPasswordConfirmEmpty(true);
    if (name.length < 2) return setNameLengthConfrim(true);
    if (!emailIsValid) return setEmailValidConfirm(true);
    if (password.length < 8) return setPasswordLengthConfirm(true);
    return mail();
  }

  async function submit() {
    setLoading(true);
    try {
      const { data, status } = await axios.post(
        '/api/user',
        { name, email, password },
        {
          validateStatus: (status) => {
            return status >= 200 && status < 500;
          },
        }
      );
      if (status === 200) {
        setLoading(false);
        document.cookie = `authtoken=${data.token}; path=/; domain=.verse.mn;  Secure; SameSite=Lax`;
        document.cookie = `userId=${data.userId}; path=/; domain=.verse.mn;  Secure; SameSite=Lax`;
        return setStep('3');
      }
      return;
    } catch (error) {
      toast.error(
        <div className="text-[#EF4444] flex gap-3">
          <div className="pt-1">
            <CircleAlert size={16} />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-base font-medium">Холболт салсан байна.</div>
            <div className="text-sm font-normal">Түр хүлээгээд дахин оролдоно уу. </div>
          </div>
        </div>
      );
    }
    setLoading(false);
  }

  return (
    <main data-theme="light" className="flex flex-col gap-6 items-center pt-[140px] h-[1000px]">
      {step === '1' && (
        <>
          <div className="py-2 font-medium text-2xl">Бүртгүүлэх</div>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <input className="h-9 rounded-2xl border border-zinc-200 p-3 w-[334px] outline-none focus:border-black" placeholder="Нэр" value={name} onChange={(e) => setName(e.target.value)} />
                {nameConfirm && (!name ? <div className="px-3 text-[#E11D48] text-xs font-normal">Нэр оруулна уу</div> : null)}
                {name && nameLengthConfirm && (name.length < 2 ? <div className="px-3 text-[#E11D48] text-xs font-normal">Нэр богино байна</div> : null)}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  className="h-9 rounded-2xl border border-zinc-200 p-3 w-[334px] outline-none focus:border-black"
                  type="email"
                  placeholder="Имэйл хаяг"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                />
                {emailConfirm && (!email ? <div className="px-3 text-[#E11D48] text-xs font-normal">Имэйл хаяг оруулна уу</div> : null)}
                {emailValidConfirm && (!emailIsValid ? <div className="px-3 text-[#E11D48] text-xs font-normal">Зөв имэйл хаяг оруулна уу</div> : null)}
              </div>
              <div className="flex flex-col gap-1 relative">
                <input
                  className="h-9 rounded-2xl border border-zinc-200 p-3 w-[334px] outline-none focus:border-black"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Нууц үг"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password &&
                  (showPassword ? (
                    <Eye size={16} onClick={ShowPassword} className="absolute right-3 top-2.5 text-sm cursor-pointer" />
                  ) : (
                    <EyeOff size={16} onClick={ShowPassword} className="absolute right-3 top-2.5 text-sm cursor-pointer" />
                  ))}
                {passwordEmpty && (!password ? <div className="px-3 text-[#E11D48] text-xs font-normal">Нууц үг оруулна уу</div> : null)}
                {password && passwordLengthConfirm && (password.length < 8 ? <div className="px-3 text-[#E11D48] text-xs font-normal">Нууц үг багадаа 8 оронтой хийнэ үү! </div> : null)}
              </div>
              <div className="flex flex-col gap-1 relative">
                <input
                  className="h-9 rounded-2xl border border-zinc-200 p-3 w-[334px] outline-none focus:border-black"
                  type={showPasswordConfirm ? 'text' : 'password'}
                  placeholder="Нууц үг давтах"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                {passwordConfirm &&
                  (showPasswordConfirm ? (
                    <Eye onClick={ShowPasswordConfirm} className="absolute right-3 top-2.5 text-sm cursor-pointer" size={16} />
                  ) : (
                    <EyeOff onClick={ShowPasswordConfirm} className="absolute right-3 top-2.5 text-sm cursor-pointer" size={16} />
                  ))}
                {passwordConfirm && (!passwordsAreSame ? <div className="px-3 text-[#E11D48] text-xs font-normal">Давтсан нууц үг буруу байна</div> : null)}
                {passwordConfirmEmpty && (!passwordConfirm ? <div className="px-3 text-[#E11D48] text-xs font-normal">Нууц үг давтаж оруулна уу</div> : null)}
              </div>
              <Button disabled={loading} onClick={next} className="disabled:cursor-not-allowed ">
                Үргэлжлүүлэх
              </Button>
            </div>
          </div>
        </>
      )}
      {step === '2' && (
        <>
          <div className="py-2 font-medium text-2xl">Имэйл хаяг баталгаажуулах</div>
          <div className="w-[400px] flex flex-col gap-5">
            <div className="text-center">"{email}" имэйл хаягт явуулсан баталгаажуулах код оруулна уу</div>
            <div className="flex items-center flex-col gap-1">
              <input onChange={(e) => setOtp(e.target.value)} value={otp} className="h-9 rounded-xl border border-zinc-200 p-3 w-[300px] outline-none focus:border-black tracking-wide" type="number" />
              {invalidOtp && <div className="px-3 text-[#E11D48] text-xs font-normal">Баталгаажуулах код буруу байна.</div>}
            </div>
            <div className="flex justify-between px-10">
              <Button disabled={loading} onClick={() => setStep('1')} className=" disabled:cursor-not-allowed">
                Буцах
              </Button>
              <Button disabled={!otp} onClick={verify} className=" disabled:cursor-not-allowed">
                Баталгаажуулах
              </Button>
            </div>
          </div>
        </>
      )}
      {step === '3' && (
        <>
          <div className="py-2 font-medium text-2xl">Таны бүртгэл амжилттай баталгаажлаа</div>
          <div className="w-[400px] flex flex-col gap-5">
            <div className="flex justify-between px-10">
              <Button disabled={loading} onClick={finsih} className="disabled:cursor-not-allowed">
                Дуусгах
              </Button>
              <Button onClick={last} className=" disabled:cursor-not-allowed">
                Өөрийн вэбсайттай болох
              </Button>
            </div>
          </div>
        </>
      )}
      {loading && (
        <div className="flex flex-col gap-4 items-center absolute top-[300px]">
          <div className="loader"></div>
          <div className="font-semibold text-base text-slate-900">Түр хүлээнэ үү...</div>
        </div>
      )}
      <Toaster />
    </main>
  );
}
