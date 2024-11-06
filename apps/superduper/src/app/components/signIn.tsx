'use client';

import { Checkbox } from '@/components/ui/Checkbox';
import { useFormik } from 'formik';
import { X } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Toaster, toast } from 'sonner';
import * as yup from 'yup';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from './ui/Dialog';
import { Input } from './ui/Input';
import { Button } from './ui/button';

export const SignIn = ({ toggleForm }: { toggleForm: () => void }) => {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(true);
  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = yup.object({
    email: yup.string().email('Wrong e-mail').required('e-mail required'),
    password: yup
      .string()
      .required('Required')
      .min(8, 'Must be 8 characters or more')
      .matches(/[a-z]+/, 'One lowercase character')
      .matches(/[A-Z]+/, 'One uppercase character')
      .matches(/[@$!%*#?&]+/, 'One special character')
      .matches(/\d+/, 'One number'),
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

          toast('Signed Up Successfully');

          setLoading(false);
        } else {
          console.log('error');
        }
        setDialogOpen(false);
        router.push('/client');
      } catch (err) {
        console.log('error in sign in');
      }
    },
    validationSchema,
  });
  const [loading, setLoading] = useState(false);

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

        toast('Signed Up Successfully');
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
              <div className="text-[#03f]">Бүртгэл үүсгэх</div>
            </span>
          </div>
          <p className="text-slate-500 mb-3">үргэлжлүүлнэ үү</p>
          <div className="flex gap-4">
            <div className="w-full h-[30px] border-2 flex items-center gap-2 p-8 bg-blue-500 rounded-lg">
              <FaFacebook className="bg-blue-500 text-white" />
              <p className="text-white">Фэйсбүүк</p>
            </div>
            <div className="w-full h-[30px] border-2 flex items-center gap-2 p-8 rounded-lg">
              <FcGoogle />
              <p>Гүүгл</p>
            </div>
          </div>
          <div className="flex items-center gap-2 py-3">
            <div className="h-[2px] flex-1 bg-slate-300"></div>
            <p>эсвэл</p>
            <div className="h-[2px] flex-1 bg-slate-300"></div>
          </div>

          <div>
            <Input name="email" placeholder="E-mail" value={formik.values.email} onChange={formik.handleChange} />
            {<span className="text-red-600">{formik.errors.email}</span>}
          </div>
          <div className="flex my-3">
            <Input name="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} />
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
    <Button variant="outline" onClick={() => toast('Signed up successfully')}>
      Show Toast
    </Button>
  );
}
