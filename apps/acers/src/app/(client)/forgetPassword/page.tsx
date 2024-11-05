'use client';

import { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const response = await fetch('/api/user/forgetPassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    setMessage(data.message || 'Нууц үг сэргээх холбоосыг илгээлээ.');
    console.log(data);
  };

  return (
    <div className="w-[300px] mx-auto text-center flex flex-col gap-4">
      <h2 className="font-bold text-xl">Нууц үг сэргээх</h2>
      <p>Бүртгэлтэй имайл хаягаа оруулж, нууц үг сэргээх холбоос авна уу </p>
      <div className="flex flex-col gap-4">
        <input
          className="w-full text-center border-[1px] rounded-lg  p-2 hover:border-blue-400"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Имэйл хаягаа оруулна уу"
          required
        />
        <button className="justify-start bg-blue-200 p-2 rounded-lg hover:bg-blue-300" onClick={handleSubmit}>
          Холбоос авах
        </button>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default ForgotPassword;
