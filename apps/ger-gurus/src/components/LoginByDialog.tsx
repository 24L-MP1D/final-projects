'use client';

import '@/components/styles.css';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { CircleAlert, Eye, EyeOff, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from './ui/dialog';

interface OpenDialog {
  onOpen: boolean;
  setOpen: (open: boolean) => void;
}

export function LoginByDialog({ onOpen, setOpen }: OpenDialog) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [PasswordIncorrect, setPasswordIncorrect] = useState(false);
  const ShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const [emailConfirm, setEmailConfirm] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(false);
  function confirm() {
    if (!email) return setEmailConfirm(true);
    if (!password) return setPasswordConfirm(true);
    return submit();
  }

  const submit = async () => {
    try {
      const { data, status } = await axios.post(
        '/api/user/login',
        { email, password },
        {
          validateStatus: (status) => {
            return status >= 200 && status < 500;
          },
        }
      );
      if (status === 200) {
        toast.success('Амжилттай нэвтэрлээ.', { className: 'custom-toast success' });
        document.cookie = `authtoken=${data.token}; path=/; domain=.verse.mn;  Secure; SameSite=Lax`;
        document.cookie = `userId=${data.userId}; path=/; domain=.verse.mn;  Secure; SameSite=Lax`;
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else if (status === 401) {
        toast.error('Хэрэглэгч бүртгэлгүй байна.', { className: 'custom-toast error' });
        return setEmailExist(true);
      } else if (status === 403) {
        toast.error('Нууц үг буруу байна.', { className: 'custom-toast error' });
        return setEmailExist(false), setPasswordIncorrect(true);
      }
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
  };

  function deleteCookie() {
    document.cookie = 'authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.verse.mn;  Secure; SameSite=Lax;';
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.verse.mn;  Secure; SameSite=Lax';
    window.location.reload();
  }

  return (
    <main>
      <Dialog open={onOpen}>
        <DialogOverlay onClick={() => setOpen(false)}>
          <Toaster />
        </DialogOverlay>
        <DialogContent aria-describedby="">
          <DialogTitle className="flex justify-between items-center">
            Нэвтрэх <X className="cursor-pointer" onClick={() => setOpen(false)} />
          </DialogTitle>

          <div className="flex flex-col justify-center gap-12 h-[300px]">
            <div className="flex flex-col gap-4 items-center">
              <div className="flex flex-col gap-1">
                <input
                  type="email"
                  id="email"
                  className={`h-9 bg-white rounded-2xl border border-zinc-200 p-3 w-[334px] outline-none focus:border-black ${emailConfirm && (!email ? '!border-[#E11D48]' : null)} ${
                    emailExist && '!border-[#E11D48]'
                  }`}
                  placeholder="Имэйл хаяг"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailConfirm && (!email ? <div className="px-3 text-[#E11D48] text-xs font-normal">Имэйл хаяг оруулна уу</div> : null)}
              </div>
              <div className="flex flex-col gap-1 relative">
                <input
                  className={`h-9 bg-white rounded-2xl border border-zinc-200 p-3 w-[334px] outline-none focus:border-black ${passwordConfirm && (!password ? '!border-[#E11D48]' : null)} ${
                    PasswordIncorrect && '!border-[#E11D48]'
                  }`}
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
                {passwordConfirm && (!password ? <div className="px-3 text-[#E11D48] text-xs font-normal">Нууц үг оруулна уу</div> : null)}
              </div>
              <Button onClick={confirm} className="w-[334px]">
                Нэвтрэх
              </Button>
              <Link className="text-sm text-gray-500 border-b-2 w-fit" href={'#'}>
                Нууц үг мартсан
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
