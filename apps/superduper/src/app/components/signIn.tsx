'use client';


import { Checkbox } from '@/components/ui/Checkbox';
import { oauth_github_client, oauth_google_client } from 'config';

import { useFormik } from 'formik';
import { Github, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Toaster, toast } from 'sonner';
import * as yup from 'yup';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from './ui/Dialog';
import { Input } from './ui/Input';
import { Button } from './ui/button';

interface FormikValues {
  email: string;
  password: string;
}

export const SignIn = ({ toggleForm }: { toggleForm: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(true);
  const initialValues = { email: '', password: '' };
  const validationSchema = yup.object({
    email: yup.string().email('Буруу и-мэйл').required('и-мэйл шаардлагатай'),
    password: yup
      .string()
      .required('Шаардлагатай')
      .min(8, '8 ба түүнээс дээш тэмдэгт байх ёстой')
      .matches(/[a-z]+/, 'Нэг жижиг үсэг')
      .matches(/[A-Z]+/, 'Нэг том үсэг')
      .matches(/[@$!%*#?&]+/, 'Нэг тусгай тэмдэгт')
      .matches(/\d+/, 'Нэг тоо'),
  });

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await fetch('/api/sign-in', {
          method: 'POST',
          body: JSON.stringify(values),
          headers: { 'Content-type': 'application/json' },
        });

        if (response.status === 201) {

          toast('Signed in Successfully');
          window.location.href = '/client';
        } else {
          toast('Sign-In Unsuccessful');

          console.log('success');


          toast.custom(() => (
            <div className={`bg-green-50 shadow-lg rounded-lg p-3 border border-green-600 flex items-center`}>
              <div className="text-3xl">✅</div>
              <div>Амжилттай нэвтэрлээ.</div>
            </div>
          ));

          setLoading(false);
          window.location.href = '/client';
        } else {
          console.log('error');

          toast.custom(() => (
            <div className={`bg-red-50 shadow-lg rounded-lg p-3 border border-red-600 flex items-center`}>
              <div className="text-3xl">❗</div>
              <div>Амжилтгүй нэвтэрлээ.</div>
            </div>
          ));

          setDialogOpen(false);

        }
        setLoading(false);
        setDialogOpen(false);
      } catch (err) {
        console.error('Sign-in error');
        setLoading(false);
      }
    },
    validationSchema,
  });

  function SignInbyGoogle() {
    const query = {
      client_id: oauth_google_client.client_id || '',
      redirect_uri: oauth_google_client.redirect_uri,
      response_type: 'code',
      scope: oauth_google_client.scopes,
      prompt: 'consent',
    };
    const url = new URL(oauth_google_client.endpoint);
    url.search = new URLSearchParams(query).toString();
    window.location.href = url.toString();
  }

  function SignInbyGithub() {
    const query = {
      client_id: oauth_github_client.client_id || '',
      redirect_uri: oauth_github_client.redirect_uri,
      scope: oauth_github_client.scopes,
      prompt: 'consent',
    };
    const url = new URL(oauth_github_client.endpoint);
    url.search = new URLSearchParams(query).toString();
    window.location.href = url.toString();
  }


  async function Submit(values: FormikValues) {
    setLoading(true);
    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.status === 201) {
        console.log('success');
        setLoading(false);

        toast('Амжилттай бүртгүүлээ.');
        window.location.href = '/client';
      } else {
        console.log('error');
        setLoading(false);
      }
    } catch (err) {
      console.log('error in sign in');
    }
  }


  return (
    <Dialog open={dialogOpen}>
      <DialogContent className="sm:max-w-[425px] rounded-lg shadow-lg bg-white">
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle className="text-center font-semibold text-blue-600 flex justify-between items-center mb-4">
            <span>Нэвтрэх эсвэл бүртгэл үүсгэх</span>
            <Link href="/client">
              <X onClick={() => setDialogOpen(false)} className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
            </Link>
          </DialogTitle>


          <div className="h-[2px] bg-slate-200 my-3"></div>
          <div className="flex justify-between items-center mb-3">
            <p className="font-bold text-gray-800">Эргээд тавтай морил!</p>

            <span onClick={toggleForm}>
              <div className="text-blue-500 hover:underline cursor-pointer">Бүртгэл үүсгэх</div>
            </span>
          </div>

          <p className="text-slate-500 mb-4">үргэлжлүүлнэ үү</p>
          <div className="flex gap-4 mb-4">
            <Button className="w-full h-[40px] bg-blue-600 text-white flex items-center justify-center rounded-lg hover:bg-blue-700 transition duration-200" onClick={SignInbyGithub}>
              <Github className="h-5 w-5" />
              <span>Github</span>
            </Button>
            <Button className="w-full h-[40px] border bg-white text-gray-700 flex items-center justify-center rounded-lg hover:bg-gray-100 transition duration-200" onClick={SignInbyGoogle}>
              <FcGoogle className="h-5 w-5" />
              <span>Google</span>

            </Button>
          </div>
          <div className="flex items-center gap-2 py-3">
            <div className="h-[1px] flex-1 bg-slate-300"></div>
            <p className="text-gray-500">эсвэл</p>
            <div className="h-[1px] flex-1 bg-slate-300"></div>
          </div>


          <div className="mb-3">
            <Input
              name="email"
              placeholder="E-mail"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="border rounded-lg p-2 w-full focus:border-blue-500 focus:ring-blue-500 transition duration-200"
            />
            {formik.errors.email && <span className="text-red-600 text-sm">{formik.errors.email}</span>}
          </div>
          <div className="mb-3">
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="border rounded-lg p-2 w-full focus:border-blue-500 focus:ring-blue-500 transition duration-200"
            />
            {formik.errors.password && <span className="text-red-600 text-sm">{formik.errors.password}</span>}
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Checkbox />
              <p className="text-gray-600">Намайг санах</p>
            </div>
            <Link className="text-blue-500 hover:underline" href="/">

              Нууц үгээ мартсан уу?
            </Link>
          </div>

          <DialogFooter>
            <Button
              className="w-full h-[40px] bg-blue-600 text-white rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition duration-200"
              type="submit"
              disabled={loading}
            >
              {loading && <Image src="/images/spinner.svg" alt="Loading" width={20} height={20} className="mr-2" />}
              <span>Нэвтрэх</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};


export function SonnerDemo() {
  return (
    <Button variant="outline" onClick={() => toast('Амжилттай бүртгүүлээ.')}>
      Show Toast
    </Button>
  );
}
