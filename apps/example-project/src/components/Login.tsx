'use client';

import axios from 'axios';
import { useState } from 'react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  function register() {
    setLoading(true);

    axios
      .post('/api/users/login', { email, password })
      .then(({ data, status, statusText }) => {
        if (status === 200) {
          alert('Success');
          localStorage.setItem('authToken', data.token);
          window.location.reload();
        } else {
          alert(statusText);
        }
      })
      .catch(({ message }) => {
        alert(message);
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
