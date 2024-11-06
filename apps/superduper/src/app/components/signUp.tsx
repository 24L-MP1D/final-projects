'use client';

import { FormikValues, useFormik } from 'formik';
import Image from 'next/image';
import { useState } from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Toaster, toast } from 'sonner';
import * as yup from 'yup';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from './ui/Dialog';
import { Input } from './ui/Input';
import { Button } from './ui/button';

export const SignUp = ({ toggleForm }: { toggleForm: () => void }) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  const validationSchema = yup.object({
    firstName: yup.string().min(1).required('First name is required'),
    lastName: yup.string().min(1).required('Last name required'),
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
    onSubmit: (values) => {
      console.log(values);
      Submit(values);
    },
    validationSchema,
  });

  const [loading, setLoading] = useState(false);

  async function Submit(values: FormikValues) {
    setLoading(true);
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

        toast('Signed Up Successfully');

        setLoading(false);
      } else {
        console.log('error');
      }
    } catch (err) {
      console.log('error in sign up');
    }
  }

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle className="font-bold text-center">Нэвтрэх эсвэл бүртгэл үүсгэх</DialogTitle>
          <div className="h-[2px] bg-slate-300 my-3"></div>
          <div className="flex justify-between">
            <p className="font-bold">Эргээд тавтай морил!</p>
            <span onClick={toggleForm}>
              <div className="text-blue-500">Нэвтрэх</div>
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
          <div className="flex gap-2 mb-3">
            <Input name="firstName" placeholder="First name" value={formik.errors.firstName} onChange={formik.handleChange} />
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
          </div>
          <DialogDescription>Хамгийн багадаа 8 тэмдэгт, нэг том үсэг, нэг жижиг үсэг, нэг тоо, нэг тусгай тэмдэгт.</DialogDescription>
          <DialogFooter>
            <Button className="bg-blue-700 flex-1 disabled:cursor-not-allowed" type="submit" disabled={loading}>
              {loading && <Image src={'/images/spinner.svg'} alt="a" width={40} height={40} color="white" />}
              Зөвшөөрч, үргэлжлүүлнэ үү
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
