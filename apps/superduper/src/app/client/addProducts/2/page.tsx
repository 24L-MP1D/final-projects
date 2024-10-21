'use client';

import { AddProductGeneral } from '@/app/components/AddProductGeneral';
import { AllCountry } from '@/app/components/allCountry';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
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
        <section className="">
          <header className="mt-16 mb-8 text-[#333333] text-2xl">Condition</header>
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex justify-between items-center">
                <div className="text-[#23448d] text-sm mb-1.5">Signatures, Labels or Markings *</div>
              </div>
              <div className="flex border-b-[1px] relative">
                <Input id="signatures" value={formik.values.signatures} onChange={formik.handleChange} maxLength={200} type="text" className="flex-1 border-none" />
                <p className={`absolute text-red-500 top-10 ${formik.touched.signatures && formik.errors.signatures ? 'block' : 'hidden'}`}>{formik.errors.signatures}</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <div className="text-[#23448d] text-sm mb-1.5">Areas of Damage *</div>
              </div>
              <div className="flex relative border-b-[1px]">
                <Input id="damage" value={formik.values.damage} onChange={formik.handleChange} maxLength={200} type="text" className="flex-1 border-none" />
                <p className={`absolute text-red-500 top-10 ${formik.touched.damage && formik.errors.damage ? 'block' : 'hidden'}`}>{formik.errors.damage}</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <div className="text-[#23448d] text-sm mb-1.5">Has it been restored? If so, to what extent?</div>
              </div>
              <div className="flex border-b-[1px] relative">
                <Input id="restored" value={formik.values.restored} onChange={formik.handleChange} maxLength={200} type="text" className="flex-1 border-none" />
                <p className={`absolute text-red-500 top-10 ${formik.touched.restored && formik.errors.restored ? 'block' : 'hidden'}`}>{formik.errors.restored}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="pb-28">
          <header className="mt-16 mb-8 text-[#333333] text-2xl">Price</header>
          <div className="flex justify-between gap-2">
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div className="text-[#23448d] text-sm mb-1.5">Price Paid*</div>
              </div>
              <div className="flex relative border-b-[1px]">
                <Input id="startBid" value={formik.values.startBid} onChange={formik.handleChange} maxLength={200} type="number" className="flex-1 border-none" />
                <p className={`absolute text-red-500 top-10 ${formik.touched.startBid && formik.errors.startBid ? 'block' : 'hidden'}`}>{formik.errors.startBid}</p>
              </div>
            </div>
            <div className="flex-1">
              <div className="">
                <div className="text-[#23448d] text-sm mb-1.5">Currency*</div>
              </div>
              <div className="flex border-b-[1px] relative">
                <Input maxLength={200} type="text" className="flex-1 border-none" />
              </div>
            </div>
          </div>
        </section>
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
