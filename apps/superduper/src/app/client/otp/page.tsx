'use client';

import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <div>
      <div className=" container mx-auto w-[500px] border-2 rounded-lg mt-[50px] flex flex-col gap-6">
        <p className="text-[24px] font-bold mt-8">Reset your password</p>
        <p>Enter your email address and press the SEND button to request a new password. You will receive an email with your new password within five minutes.</p>
        <div>
          <input placeholder="Insert OTP" className="border-2 bg-slate-50 rounded-3xl w-full p-3" />
        </div>
        <div>
          <input placeholder="New password" className="border-2 bg-slate-50 rounded-3xl w-full p-3" />
        </div>
        <Button className="bg-blue-500 mb-8">Send</Button>
      </div>
    </div>
  );
}
