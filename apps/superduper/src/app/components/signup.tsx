import { DialogTitle } from '@radix-ui/react-dialog';
import { useFormik } from 'formik';
import Link from 'next/link';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import * as yup from 'yup';
import { Button } from './ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTrigger } from './ui/Dialog';
import { Input } from './ui/Input';

export const SignUp = () => {
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
      alert(`firstName:${values.firstName}, lastName:${values.lastName}, email:${values.email}, password:${values.password}`);
    },
    validationSchema,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Sign Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form>
          <DialogTitle className="font-bold text-center">Sign in or Create an account</DialogTitle>
          <div className="h-[2px] bg-slate-300 my-3"></div>
          <div className="flex justify-between">
            <p>Welcome Back!</p>
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
            <Input placeholder="First name" value={formik.values.firstName} onChange={formik.handleChange} />
            {<span className="text-red-600">{formik.errors.firstName}</span>}
            <Input placeholder="Last name" value={formik.values.lastName} onChange={formik.handleChange} />
            {<span className="text-red-600">{formik.errors.lastName}</span>}
          </div>
          <div>
            <Input placeholder="E-mail" value={formik.values.email} onChange={formik.handleChange} />
            {<span className="text-red-600">{formik.errors.email}</span>}
          </div>
          <div className="flex my-3">
            <Input placeholder="Password" value={formik.values.password} onChange={formik.handleChange} />
            {<span className="text-red-600">{formik.errors.password}</span>}
          </div>
          <DialogDescription>At least 8 characters, one capital letter, one lower case letter, one number and one special character.</DialogDescription>
        </form>

        <DialogFooter>
          <Button onClick={} className="bg-blue-700 flex-1" type="submit">
            Agree and Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
