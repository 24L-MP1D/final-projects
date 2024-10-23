'use client';

import { FormikValues, useFormik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from './ui/Dialog';
import { Input } from './ui/Input';
import { Button } from './ui/button';

export const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
      Submit(values);
    },
    validationSchema,
  });

  async function Submit(values: FormikValues) {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.status === 201) {
        console.log('success');
      } else {
        console.log('error');
      }
    } catch (err) {
      console.log('error in sign up');
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Sign Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle className="font-bold text-center">Sign in or Create an account</DialogTitle>
          <div className="h-[2px] bg-slate-300 my-3"></div>
          <div className="flex justify-between">
            <p className="font-bold">Welcome Back!</p>
            <Link href="/sign in">
              <div className="text-blue-500">Sign in</div>
            </Link>
          </div>
          <p className="text-slate-500 mb-3">Continue with</p>
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
            <p>or</p>
            <div className="h-[2px] flex-1 bg-slate-300"></div>
          </div>
          <div className="flex gap-2 mb-3">
            <Input placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            {<span className="text-red-600">{}</span>}
            <Input placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            {<span className="text-red-600">{}</span>}
          </div>
          <div>
            <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            {<span className="text-red-600">{}</span>}
          </div>
          <div className="flex my-3">
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {<span className="text-red-600">{}</span>}
          </div>
          <DialogDescription>At least 8 characters, one capital letter, one lower case letter, one number and one special character.</DialogDescription>
        </form>

        <DialogFooter>
          <Button onClick={Submit} className="bg-blue-700 flex-1 disabled:cursor-not-allowed" type="submit" disabled={isValid}>
            Agree and Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

{
  /* <div className="flex gap-2 mb-3">
            <Input placeholder="First name" value={formik.values.firstName} onChange={formik.handleChange} />
            {<span className="text-red-600">{formik.errors.firstName}</span>}
            <Input name="lastName" placeholder="Last name" value={formik.values.lastName} onChange={formik.handleChange} />
            {<span className="text-red-600">{formik.errors.lastName}</span>}
          </div>
          <div>
            <Input name="email" placeholder="E-mail" value={formik.values.email} onChange={formik.handleChange} />
            {<span className="text-red-600">{formik.errors.email}</span>}
          </div>
          <div className="flex my-3">
            <Input name="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} />
            {<span className="text-red-600">{formik.errors.password}</span>}
          </div> */
}
