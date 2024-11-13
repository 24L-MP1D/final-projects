'use client';

import { Checkbox } from '@/components/ui/Checkbox';
import { useFormik } from 'formik';
import { Github, X } from 'lucide-react';

import { oauth_github_client, oauth_google_client } from 'config';
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
  const initialValues = {
    email: '',
    password: '',
  };
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
          headers: {
            'Content-type': 'application/json',
          },
        });

        if (response.status === 201) {
          console.log('success');

          toast('Амжилттай бүртгүүлээ.');
          setLoading(false);
          window.location.href = '/client';
        } else {
          console.log('error');
          toast('амжилтгүй');
          setDialogOpen(false);
        }
        setDialogOpen(false);
      } catch (err) {
        console.log('error in sign in');
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
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle className="font-thin text-center flex justify-between">
            <div>Нэвтрэх эсвэл бүртгэл үүсгэх</div>
            <Link href="/client">
              <X onClick={() => setDialogOpen(false)} className="h-4 w-4" />
            </Link>
          </DialogTitle>

          {/* <button onClick={() => setDialogOpen(false)} className="text-gray-500 hover:text-gray-700">
            ✕
          </button> */}
          <div className="h-[2px] bg-slate-300 my-3"></div>
          <div className="flex justify-between">
            <p className="font-bold">Эргээд тавтай морил!</p>
            <span onClick={toggleForm}>
              <div className="text-[#03f] hover:cursor-pointer">Бүртгэл үүсгэх</div>
            </span>
          </div>
          <p className="text-slate-500 mb-3">үргэлжлүүлнэ үү</p>
          <div className="flex gap-4">
            <Button className="w-full h-[30px] border-2 flex items-center gap-2 p-8 bg-blue-500 rounded-lg" onClick={SignInbyGithub}>
              <Github />
              <p className="text-white">ГитХаб</p>
            </Button>
            <Button className="w-full h-[30px] border-2 flex items-center gap-2 p-8 rounded-lg" onClick={SignInbyGoogle}>
              <FcGoogle />
              <p>Гүүгл</p>
            </Button>
          </div>
          <div className="flex items-center gap-2 py-3">
            <div className="h-[2px] flex-1 bg-slate-300"></div>
            <p>эсвэл</p>
            <div className="h-[2px] flex-1 bg-slate-300"></div>
          </div>

          <div>
            <Input name="email" placeholder="И-мэйл" value={formik.values.email} onChange={formik.handleChange} />
            {<span className="text-red-600">{formik.errors.email}</span>}
          </div>
          <div className="flex my-3">
            <Input name="password" placeholder="Нууц үг" value={formik.values.password} onChange={formik.handleChange} />
            {<span className="text-red-600">{formik.errors.password}</span>}
          </div>
          <div className="flex justify-between m-3">
            <div className="flex items-center gap-3">
              <Checkbox />
              <p>Намайг санах</p>
            </div>

            <Link className="text-blue-500" href="/">
              Нууц үгээ мартсан уу?
            </Link>
          </div>

          <DialogFooter>
            <Button className="bg-blue-700 flex w-full disabled:cursor-not-allowed" type="submit" disabled={loading}>
              {loading && <Image src={'/images/spinner.svg'} alt="a" width={40} height={40} />}
              <div>Нэвтрэх</div>
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
