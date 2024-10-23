'use client';

import { AddProductGeneral } from '@/components/AddProductGeneral';
import { AllCountry } from '@/components/allCountry';
import { ProductCondition } from '@/components/ProductCondition';
import { ProductPrice } from '@/components/ProductPrice';
import { Button } from '@/components/ui/button';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

export default function Page() {
  const router = useRouter();
  const [country, setCountry] = useState<string[]>([]);

  const [showCountry, setShowCountry] = useState(false);

  const initialValues = {
    countryOfOrigin: '',
    productName: '',
    additionalInformation: '',
    signatures: '',
    damage: '',
    restored: '',
    startBid: Number(''),
  };
  const validationSchema = yup.object({
    countryOfOrigin: yup.string().required('you must enter country of origin'),
    productName: yup.string().required('you must enter product name'),
    additionalInformation: yup.string().required('you must enter additional information'),
    signatures: yup.string().required('you must enter signatures'),
    damage: yup.string().required('you must enter damage'),
    restored: yup.string().required('you must enter restored'),
    startBid: yup.number().required('you must enter startBid').min(1),
  });
  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      router.push(`/client/addProducts/3`);
    },
    validationSchema,
  });
  useEffect(() => {
    setCountry(AllCountry);
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} onClick={() => showCountry && setShowCountry(false)}>
      <div className="max-w-[50%] mx-auto mt-10">
        <div className="flex flex-col gap-1 max-w-[500px] mx-auto text-2xl">
          <div className="flex gap-2 items-center justify-center w-full text-[#00253e]">
            <div className="p-0.5 rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
            </div>
            <div className="bg-[#00253e] h-0.5 w-[70px]"></div>
            <div className="p-0.5 border-2 border-[#00253e] rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
            </div>
            <div className="bg-[#f3f3f3] h-0.5 w-[70px]"></div>
            <div className="p-0.5 rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
            </div>
            <div className="bg-[#f3f3f3] h-0.5 w-[70px]"></div>
            <div className="p-0.5 rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
            </div>
            <div className="bg-[#f3f3f3] h-0.5 w-[70px]"></div>
            <div className="p-0.5 rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
            </div>
          </div>
          <div className="flex gap-10 justify-center items-center ">
            <div>Category</div>
            <div>Detail</div>
            <div className="text-[#f3f3f3]">Photos</div>
            <div className="text-[#f3f3f3]">Logistics</div>
            <div className="text-[#f3f3f3]">Review</div>
          </div>
        </div>
        <div className="mt-8 text-center text-[#333] text-[48px]">Tell us about your item</div>
        <header className="text-[#333333] text-2xl mb-8">General</header>
        <AddProductGeneral
          showCountry={showCountry}
          setShowCountry={setShowCountry}
          formikSetValues={formik.setValues}
          formikValues={formik.values}
          formikErrors={formik.errors}
          formikTouched={formik.touched}
          formikHandleChange={formik.handleChange}
        />
        <ProductCondition formikErrors={formik.errors} formikValues={formik.values} formikHandleChange={formik.handleChange} formikTouched={formik.touched} />
        <ProductPrice formikErrors={formik.errors} formikHandleChange={formik.handleChange} formikTouched={formik.touched} formikValues={formik.values} />
      </div>
      <div className="flex gap-2 w-full justify-center fixed bottom-0 bg-[#ffffff] py-2 left-[50%] translate-x-[-50%]">
        <div>Click “continue” to save your progress for this step</div>
        <Link className="bg-slate-300 text-center py-2 px-4 rounded-lg" href={'/client/addProducts'}>
          BACK
        </Link>
        <Button type="submit">CONTINUE</Button>
      </div>
    </form>
  );
}
