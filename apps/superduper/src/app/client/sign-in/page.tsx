'use client';

import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export default function signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log();
  async function Submit() {
    console.log(email, password);
    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.ok) {
        console.log('success');
      } else {
        console.log('error');
      }
    } catch (err) {
      console.log('error in sign up');
    }
  }

  return (
    <div className="bg-slate-50">
      <div className="w-[500px] container mx-auto gap-3 border-2 rounded-lg mt-[100px] pb-[50px] bg-white">
        <div className="text-center m-3">Sign in or create an account</div>
        <div className="h-[2px] bg-slate-300"></div>
        <div className="flex justify-between m-3 items-center">
          <p className="text-[24px] font-bold">Welcome back!</p>
          <Link href="/client/sign-up">
            <div className="text-blue-500">Create account</div>
          </Link>
        </div>
        <p className="text-slate-500 mb-3 m-3">Continue with</p>
        <div className="flex gap-4">
          <div className="w-full h-[30px] border-2 flex items-center gap-2 p-8 bg-blue-500 rounded-lg">
            <FaFacebook className="bg-blue-500 text-white" />
            <p className="text-white">Facebook</p>
          </div>
          <div className="w-full h-[30px] border-2 flex items-center gap-2 p-8 rounded-lg">
            <FcGoogle />
            <p>Google</p>
          </div>
        </div>
        <div className="flex items-center gap-2 py-3">
          <div className="h-[2px] flex-1 bg-slate-300"></div>
          <p className="text-slate-500">or</p>
          <div className="h-[2px] flex-1 bg-slate-300"></div>
        </div>
        <div className="mb-3">
          <input
            className="w-full border-2 rounded-lg p-3"
            placeholder="Email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <input className="w-full border-2 rounded-lg p-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="flex justify-between m-3">
          <div className="flex items-center gap-3">
            <Checkbox />
            <p>Remember me</p>
          </div>
          <Link className="text-blue-500" href="/">
            Forgotten your password?
          </Link>
        </div>
        <Button className="bg-blue-700 w-full disabled:cursor-not-allowed" onClick={Submit}>
          Sign in
        </Button>
      </div>
    </div>
  );
}
