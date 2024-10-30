'use client';

import { fetcher } from '@/lib/fetcher';
import { useState } from 'react';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  function register() {
    setLoading(true);

    fetcher()
      .post('/api/users/login', {
        email,
        password,
      })
      .then(({ data }) => {
        const { token } = data;
        localStorage.setItem('authToken', token);
        alert('success');
      })
      .catch(({ response }) => {
        alert(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="flex items-center justify-center">
      <div className="pt-8 space-y-2">
        <div>
          <input disabled={loading} className="input input-bordered" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <input disabled={loading} className="input input-bordered" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <button disabled={loading} className="btn" onClick={register}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
