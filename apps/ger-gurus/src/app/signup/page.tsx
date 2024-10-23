'use client';

import { CircleAlert, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import '../components/styles.css';
import { Button } from '../components/ui/button';

export default function Index() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const ShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const ShowPasswordConfirm = () => {
    setShowPasswordConfirm((prev) => !prev);
  };

  console.log({ name, email, password, passwordConfirm });

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsAreSame = password === passwordConfirm && password !== '';
  const emailIsValid = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(email);
  const passwordValid = hasUppercase && hasLowercase && hasNumber && hasSpecialChar;

  const [nameConfirm, setNameConfirm] = useState(false);
  const [namelengthConfirm, setNamelengthConfrim] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState(false);
  const [emailValidConfirm, setEmailValidConfirm] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [passwordLengthConfrim, setPasswordlenghtConfrim] = useState(false);
  const [passwordValidConfirm, setPasswordValidConfirm] = useState(false);
  const [passwordConfirmEmpty, setPasswordConfirmEmpty] = useState(false);
  function reset() {
    setNameConfirm(false);
    setNamelengthConfrim(false);
    setEmailConfirm(false);
    setEmailValidConfirm(false);
    setPasswordEmpty(false);
    setPasswordlenghtConfrim(false);
    setPasswordValidConfirm(false);
    setPasswordValidConfirm(false);
    setName('');
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
  }

  function final() {
    if (!name) setNameConfirm(true);
    if (!email) setEmailConfirm(true);
    if (!password) setPasswordEmpty(true);
    if (!passwordConfirm) return setPasswordConfirmEmpty(true);
    if (name.length < 2) return setNamelengthConfrim(true);
    if (!emailIsValid) return setEmailValidConfirm(true);
    if (password.length < 8) return setPasswordlenghtConfrim(true);
    if (!passwordValid) return setPasswordValidConfirm(true);
    return submit();
  }

  function submit() {
    try {
      fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          'Content-type': 'Application/json; charset=UTF-8',
        },
      }).then((res) => {
        if (res.ok) {
          toast.success('Амжилттай бүртгүүллээ.', { className: 'custom-toast success' });
          reset();
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        } else if (res.status === 401) {
          toast.error('Имэйл хаяг бүртгэлтэй байна.', { className: 'custom-toast error' });
        } else if (!res.ok) {
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
          ),
            { className: 'custom-toast error' };
        }
        return res.text();
      });
    } catch (error) {
      toast.error(
        <div className="text-[#EF4444] flex gap-3">
          <div className="pt-1">
            <CircleAlert size={16} />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-base font-medium">Холболт салсан байна.</div>
            <div className="text-sm font-normal">Түр хүлээгээд дахин оролдоно уу.</div>
          </div>
        </div>
      ),
        { className: 'custom-toast error' };
    }
  }
  const customToast = {
    success: 'custom-toast success',
    error: 'custom-toast error',
  };

  return (
    <div className="flex flex-col gap-6 items-center pt-[140px] h-[1000px]">
      <div className="py-2 font-medium text-2xl">Бүртгүүлэх</div>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <input className="h-9 rounded-2xl border border-zinc-200 p-3 w-[334px] outline-none focus:border-black" placeholder="Нэр" value={name} onChange={(e) => setName(e.target.value)} />
            {nameConfirm && (!name ? <div className="px-3 text-[#E11D48] text-xs font-normal">Нэр оруулна уу</div> : null)}
            {name && namelengthConfirm && (name.length < 2 ? <div className="px-3 text-[#E11D48] text-xs font-normal">Нэр богино байна</div> : null)}
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
            {password && passwordLengthConfrim && (password.length < 8 ? <div className="px-3 text-[#E11D48] text-xs font-normal">Нууц үг богино байна</div> : null)}
            {passwordValidConfirm && (!passwordValid ? <div className="px-3 text-[#E11D48] text-xs font-normal">Нууц үг шаардлага хангахгүй байна</div> : null)}
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
          <ul className="flex flex-col gap-1 list-disc font-normal text-xs leading-4 pl-3">
            <li className={`${!password ? '!text-[#71717A]' : ''} ${hasUppercase ? 'text-green-600' : 'text-red-600'}`}>Том үсэг орсон байх</li>
            <li className={`${!password ? '!text-[#71717A]' : ''} ${hasLowercase ? 'text-green-600' : 'text-red-600'}`}>Жижиг үсэг орсон байх</li>
            <li className={`${!password ? '!text-[#71717A]' : ''} ${hasNumber ? 'text-green-600' : 'text-red-600'}`}>Тоо орсон байх</li>
            <li className={`${!password ? '!text-[#71717A]' : ''} ${hasSpecialChar ? 'text-green-600' : 'text-red-600'}`}>Тэмдэгт орсон байх</li>
          </ul>
          <Button onClick={final} className="w-[334px]" type="submit">
            Үүсгэх
          </Button>
        </div>
        <Link href={'/login'}>
          <Button className="w-[334px] bg-white border !border-[#2563EB] text-[#2563EB]">Нэвтрэх</Button>
        </Link>
      </div>
      <Toaster />
    </div>
  );
}
