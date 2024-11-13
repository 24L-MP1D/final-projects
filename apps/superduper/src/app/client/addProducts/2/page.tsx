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
    startBid: 0,
    startDate: new Date(''),
    endDate: new Date(''),
  };
  const validationSchema = yup.object({
    countryOfOrigin: yup.string().required('та гарал үүслийн улсаа оруулах ёстой'),
    productName: yup.string().required('та бүтээгдэхүүний нэрийг оруулах ёстой'),
    additionalInformation: yup.string().required('та нэмэлт мэдээлэл оруулах ёстой'),
    signatures: yup.string().required('та гарын үсэг оруулах ёстой'),
    damage: yup.string().required('та гэмтлийн тухай мэдээлэл оруулах ёстой'),
    restored: yup.string().required('та сэргээгдсэн тухай мэдээлэл оруулах ёстой'),
    startBid: yup.number().required('та эхлэх үнийн саналыг оруулах ёстой').min(1),
    startDate: yup.date().required('эхлэх огноо заавал байх ёстой'),
    endDate: yup.date().required('дуусах огноо заавал байх ёстой'),
  });
  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      const addProductObject = JSON.parse(localStorage.getItem('addProduct') || '[]');
      addProductObject.countryOfOrigin = values.countryOfOrigin;
      addProductObject.productName = values.productName;
      addProductObject.additionalInformation = values.additionalInformation;
      addProductObject.signatures = values.signatures;
      addProductObject.damage = values.damage;
      addProductObject.restored = values.restored;
      addProductObject.startBid = values.startBid;
      addProductObject.startDate = values.startDate;
      addProductObject.endDate = values.endDate;
      localStorage.setItem('addProduct', JSON.stringify(addProductObject));
      router.push(`/client/addProducts/3`);
    },
    validationSchema,
  });
  useEffect(() => {
    const addProductObject = JSON.parse(localStorage.getItem('addProduct') || '{}');
    if (addProductObject) {
      formik.setValues({
        countryOfOrigin: addProductObject.countryOfOrigin,
        productName: addProductObject.productName,
        additionalInformation: addProductObject.additionalInformation,
        signatures: addProductObject.signatures,
        damage: addProductObject.damage,
        restored: addProductObject.restored,
        startBid: addProductObject.startBid,
        startDate: addProductObject.startDate,
        endDate: addProductObject.endDate,
      });
    }

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
            <div className="bg-[#00253e] h-0.5 w-[100px]"></div>
            <div className="p-0.5 border-2 border-[#00253e] rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
            </div>
            <div className="bg-[#f3f3f3] h-0.5 w-[100px]"></div>
            <div className="p-0.5 rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
            </div>
            <div className="bg-[#f3f3f3] h-0.5 w-[100px]"></div>
            <div className="p-0.5 rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
            </div>
            <div className="bg-[#f3f3f3] h-0.5 w-[100px]"></div>
            <div className="p-0.5 rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
            </div>
          </div>

          <div className="flex gap-5 relative left-[-50px] items-center">
            <div>Ангилал</div>
            <div>Дэлгэрэнгүй</div>
            <div className="text-[#f3f3f3]">Зураг</div>
            <div className="text-[#f3f3f3] ml-3">Логистик</div>
            <div className="text-[#f3f3f3] ml-5">Хянан үзэх</div>
          </div>
        </div>
        <div className="mt-8 text-center text-[#333] text-[48px]">Барааныхаа талаар бидэнд хэлнэ үү</div>
        <header className="text-[#333333] text-2xl mb-8">Ерөнхий</header>
        <AddProductGeneral
          showCountry={showCountry}
          setShowCountry={setShowCountry}
          formikSetFieldValue={formik.setFieldValue}
          formikValues={formik.values}
          formikErrors={formik.errors}
          formikTouched={formik.touched}
          formikHandleChange={formik.handleChange}
        />
        <ProductCondition formikErrors={formik.errors} formikValues={formik.values} formikHandleChange={formik.handleChange} formikTouched={formik.touched} />
        <ProductPrice formikSetFieldValue={formik.setFieldValue} formikErrors={formik.errors} formikHandleChange={formik.handleChange} formikTouched={formik.touched} formikValues={formik.values} />
      </div>
      <div className="flex gap-2 w-full justify-center fixed bottom-0 bg-[#ffffff] py-2 left-[50%] translate-x-[-50%]">
        <div>"Үргэлжлүүлэх" дээр дарж энэ алхамын явцаа хадгална уу</div>
        <Link className="bg-slate-300 text-center py-2 px-4 rounded-lg" href={'/client/addProducts'}>
          БУЦАХ
        </Link>
        <Button type="submit">ҮРГЭЛЖЛҮҮЛЭХ</Button>
      </div>
    </form>
  );
}
