'use client';

import { oauth_github_client_signUp, oauth_google_client_signUp } from 'config';
import { FormikValues, useFormik } from 'formik';
import { Github, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Toaster, toast } from 'sonner';
import * as yup from 'yup';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from './ui/Dialog';
import { Input } from './ui/Input';
import { Button } from './ui/button';

export const SignUp = ({ toggleForm }: { toggleForm: () => void }) => {
  const [dialogOpen, setDialogOpen] = useState(true);
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  const validationSchema = yup.object({
    firstName: yup.string().min(1).required('Нэр оруулах шаардлагатай'),
    lastName: yup.string().min(1).required('Овог оруулах шаардлагатай'),
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
    onSubmit: (values) => {
      Submit(values);
    },
    validationSchema,
  });

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const ShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

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


        toast.custom(() => (
          <div className={`bg-green-50 shadow-lg rounded-lg p-3 border border-green-600 flex items-center`}>
            <div className="text-3xl">✅</div>
            <div>Амжилттай бүртгэгдлээ</div>
          </div>
        ));

        setLoading(false);
        window.location.href = '/client/sign-in';
      } else {
        console.log('error');

        toast.custom(() => (
          <div className={`bg-red-50 shadow-lg rounded-lg p-3 border border-red-600 flex items-center`}>
            <div className="text-3xl">❗</div>
            <div>Бүртгэл амжилтгүй.</div>
          </div>
        ));


        setDialogOpen(false);
      }
    } catch (err) {
      console.log('error in sign up');
    }
  }
  function SignInbyGoogle() {
    const query = {
      client_id: oauth_google_client_signUp.client_id || '',
      redirect_uri: oauth_google_client_signUp.redirect_uri,
      response_type: 'code',
      scope: oauth_google_client_signUp.scopes,
      prompt: 'consent',
    };

    const url = new URL(oauth_google_client_signUp.endpoint);
    url.search = new URLSearchParams(query).toString();

    window.location.href = url.toString();
  }

  function SignInbyGithub() {
    const query = {
      client_id: oauth_github_client_signUp.client_id || '',
      redirect_uri: oauth_github_client_signUp.redirect_uri,
      scope: oauth_github_client_signUp.scopes,
      prompt: 'consent',
    };
    const url = new URL(oauth_github_client_signUp.endpoint);
    url.search = new URLSearchParams(query).toString();
    window.location.href = url.toString();
  }

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle className="font-thin text-center flex justify-between border-b-2 border-slate-200s pb-4">
            <div>Нэвтрэх эсвэл бүртгэл үүсгэх</div>
            <Link href="/client">
              <X onClick={() => setDialogOpen(false)} className="h-4 w-4" />
            </Link>
          </DialogTitle>
          <div className="flex justify-between">
            <p className="font-bold"></p>
            <span onClick={toggleForm}>
              <div className="text-blue-500 hover:cursor-pointer">Нэвтрэх</div>
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
          <div className="flex gap-2 mb-3">
            <div>
              <Input name="firstName" placeholder="Нэр" value={formik.errors.firstName} onChange={formik.handleChange} />
              {formik.errors.firstName && formik.touched.firstName && <span className="text-red-600 ml-3">{formik.errors.firstName}</span>}
            </div>
            <div>
              <Input name="lastName" placeholder="Овог" value={formik.values.lastName} onChange={formik.handleChange} />
              {formik.errors.lastName && formik.touched.lastName && <span className="text-red-600 ml-3">{formik.errors.lastName}</span>}
            </div>
          </div>
          <div>
            <Input name="email" placeholder="И-мэйл" value={formik.values.email} onChange={formik.handleChange} />
            {formik.errors.email && formik.touched.email && <span className="text-red-600 ml-3">{formik.errors.email}</span>}
          </div>
          <div className="my-3 flex items-center relative">
            <Input name="password" type={showPassword ? 'text' : 'password'} placeholder="Нууц үг" value={formik.values.password} onChange={formik.handleChange} />
            <div className="absolute right-5 hover:cursor-pointer">
              {formik.values.password && showPassword ? <FaEye onClick={() => setShowPassword(false)} /> : <FaRegEyeSlash onClick={() => setShowPassword(true)} />}
            </div>

            {formik.errors.password && formik.touched.password && <span className="text-red-600 ml-3">{formik.errors.password}</span>}
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
    <Button variant="outline" onClick={() => toast('Амжилттай бүртгүүлээ.')}>
      Show Toast
    </Button>
  );
}
