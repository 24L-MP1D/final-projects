'use client';

import { SignIn } from '@/app/components/signIn';
import { SignUp } from '@/app/components/signUp';
import { useState } from 'react';

export const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">{isSignUp ? <SignUp toggleForm={() => setIsSignUp(false)} /> : <SignIn toggleForm={() => setIsSignUp(true)} />}</div>
  );
};

export default AuthForm;
