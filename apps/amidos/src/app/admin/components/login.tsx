'use client';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

export default function LoginPage() {
  const validationSchema = Yup.object({
    email: Yup.string().email('буруу и-мэйл').required('И-мэйл ээ оруулна уу'),
    password: Yup.string()
      .min(8, 'Нууц үг хамгийн багадаа 8 тэмдэгттэй байх ёстой')
      .matches(/[A-Z]/, 'Нууц үг дор хаяж 1 том үсэг агуулсан байх ёстой')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Нууц үг дор хаяж 1 тусгай тэмдэгт агуулсан байх ёстой')
      .required('Нууц үгээ оруулна уу?'),
  });
  const initialValues = {
    email: '',
    password: '',
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      await login(values);
    },
    validationSchema,
  });

  interface FormValues {
    email: string;
    password: string;
  }
  const router = useRouter();

  const login = async (values: FormValues) => {
    try {
      const response = await fetch(`/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(values),
      });
      if (response.status === 201) {
        console.log('Successfully signed in');

        const { accesstoken } = await response.json();
        Cookies.set('token', accesstoken, { expires: 7, path: '/' });

        router.push('/');
      } else {
        console.log('Error during login, status:', response.status);
      }
    } catch (error) {
      console.error('Login failed due to error:', error);
    }
  };
  return (
    <div className="container m login-box flex mx-auto align-items-center w-[334px] mt-20 my-auto">
      <form onSubmit={formik.handleSubmit}>
        <div className="w-[334px] h-[446px]">
          <h1 className="mx-center font-semibold  mb-5 text-center text-[#09090B]">Нэвтрэх</h1>
          <Input type="email" id="email" placeholder="И-мэйл" className="rounded-2xl w-full mt-4 text-black" value={formik.values.email} onChange={formik.handleChange} />
          {formik.errors.email && formik.touched.email && <span className="text-red-500 text-sm text-start">{formik.errors.email}</span>}
          <Input id="password" type="password" placeholder="Нууц үг" className="rounded-2xl w-full mt-4 text-black" value={formik.values.password} onChange={formik.handleChange} />
          {formik.errors.password && formik.touched.password && <span className="text-red-500 text-sm text-start">{formik.errors.password}</span>}

          <Button type="submit" variant="def2" className="bg-blue-500 w-full text-white mt-3 rounded-2xl">
            Нэвтрэх
          </Button>
          <div className="text-center mt-4">
            <Link href="/forgotPass" className="text-[#71717A] text-align-center text-center mt-2" type="forgetpassword">
              Нууц үг мартсан
            </Link>
          </div>

          <Button asChild variant="def3" className="text-blue-500 rounded-2xl">
            <Link href="/register" className="bg-sky-50 mt-8 w-full def2" type="password">
              Бүртгүүлэх
            </Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
