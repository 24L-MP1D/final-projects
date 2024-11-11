'use client';

import { AllCountry } from '@/components/allCountry';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { useFormik } from 'formik';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import * as yup from 'yup';
export default function Page() {
  const router = useRouter();
  const [country, setCountry] = useState<string[]>([]);
  const [oneCountry, setOneCountry] = useState('');
  const [showCountry, setShowCountry] = useState(false);
  const initialValues = {
    Country: '',
    firstName: '',
    lastName: '',
    city: '',
    email: '',
  };
  const validationSchema = yup.object({
    Country: yup.string().required('country must be required'),
    firstName: yup.string().required('firstname must be required'),
    lastName: yup.string().required('lastname must be required'),
    city: yup.string().required('city must be required'),
    email: yup.string().required('email must be required'),
  });
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const addProductObject = JSON.parse(localStorage.getItem('addProduct') || '{}');
      addProductObject.Country = values.Country;
      addProductObject.firstName = values.firstName;
      addProductObject.lastName = values.lastName;
      addProductObject.city = values.city;
      addProductObject.email = values.email;
      localStorage.setItem('addProduct', JSON.stringify(addProductObject));
      router.push('/client/addProducts/5');
    },
    validationSchema,
  });
  useEffect(() => {
    setCountry(AllCountry);
    const addProductObject = JSON.parse(localStorage.getItem('addProduct') || '{}');
    if (addProductObject) {
      formik.setValues({
        Country: addProductObject.Country,
        firstName: addProductObject.firstName,
        lastName: addProductObject.lastName,
        city: addProductObject.city,
        email: addProductObject.email,
      });
    }
  }, []);

  return (
    <form onClick={() => showCountry && setShowCountry(false)} onSubmit={formik.handleSubmit}>
      <div className="max-w-[50%] mx-auto mt-10">
        <div className="flex flex-col gap-1 max-w-[500px] mx-auto text-2xl">
          <div className="flex gap-2 items-center justify-center w-full text-[#00253e]">
            <div className="p-0.5 rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
            </div>
            <div className="bg-[#00253e] h-0.5 w-[100px]"></div>
            <div className="p-0.5  rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
            </div>
            <div className="bg-[#00253e] h-0.5 w-[100px]"></div>
            <div className="p-0.5  rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
            </div>
            <div className="bg-[#00253e] h-0.5 w-[100px]"></div>
            <div className="p-0.5 rounded-full border-2 border-[#00253e]">
              <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
            </div>
            <div className="bg-[#f3f3f3] h-0.5 w-[100px]"></div>
            <div className="p-0.5 rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
            </div>
          </div>

          <div className="flex gap-5 relative left-[-50px] items-center">
            <div>Category</div>
            <div>Дэлгэрэнгүй</div>
            <div>Зураг</div>
            <div className="ml-3">Логистик</div>
            <div className="text-[#f3f3f3] ml-5">Хянан үзэх</div>
          </div>
        </div>
        <div className="mt-8 text-center text-[#333] text-[48px] mb-16">Холбоо барих болон ложистикийн мэдээллийг хуваалцах</div>
        <div>
          <div className="flex flex-col gap-8">
            <div className="flex gap-2">
              <div className="flex-1 border-b-[1px]">
                <p>Нэр</p>
                <div>
                  <Input className="border-none" type="text" maxLength={32} id="firstName" value={formik.values.firstName} onChange={formik.handleChange} />
                  {formik.touched.firstName && formik.errors.firstName && <p className="text-red-600">{formik.errors.firstName}</p>}
                </div>
              </div>

              <div className="flex-1 border-b-[1px]">
                <p>Овог</p>
                <div>
                  <Input id="lastName" value={formik.values.lastName} type="text" maxLength={32} onChange={formik.handleChange} className="border-none" />
                  {formik.touched.lastName && formik.errors.lastName && <p className="text-red-600">{formik.errors.lastName}</p>}
                </div>
              </div>
            </div>
            <div>
              <p>Улс</p>
              <div className="flex border-b-[1px] relative">
                <Input
                  id="Country"
                  value={formik.values.Country}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setOneCountry(e.target.value.toLowerCase());
                  }}
                  type="text"
                  className="flex-1 border-none"
                />
                <div className="hover:cursor-pointer">
                  <ChevronDown
                    onClick={() => {
                      setShowCountry(true);
                    }}
                    className="w-10 h-10"
                  />
                </div>
                <p className={`absolute text-red-500 top-10 ${formik.touched.Country && formik.errors.Country ? 'block' : 'hidden'}`}>{formik.errors.Country}</p>
                {(showCountry || oneCountry) && (
                  <div className="absolute z-50 top-10 w-full overflow-x-scroll border-[1px] border-blue-600 h-[300px] bg-[#ffffff] shadow">
                    {country.map(
                      (item) =>
                        item.toLowerCase().includes(oneCountry) && (
                          <div
                            key={item}
                            onClick={() => {
                              formik.setFieldValue('Country', item);
                              setOneCountry('');
                            }}
                            className="p-3 hover:bg-blue-600 hover:cursor-pointer"
                          >
                            {item}
                          </div>
                        )
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="border-b-[1px]">
              <p>Хот:</p>
              <Input className="border-none" type="text" maxLength={20} id="city" value={formik.values.city} onChange={formik.handleChange} />
              {formik.touched.city && formik.errors.city && <p className="text-red-600">{formik.errors.city}</p>}
            </div>
            <div className="border-b-[1px]">
              <p>Имэйл хаяг:</p>
              <Input className="border-none" type="email" maxLength={32} id="email" value={formik.values.email} onChange={formik.handleChange} />
              {formik.touched.email && formik.errors.email && <p className="text-red-600">{formik.errors.email}</p>}
            </div>
          </div>
          <div className="flex gap-2 w-full justify-center fixed bottom-0 bg-[#ffffff] py-2 left-[50%] translate-x-[-50%]">
            <div>"Үргэлжлүүлэх" дээр дарж энэ алхамын явцаа хадгална уу</div>
            <Link className="bg-slate-300 text-center py-2 px-4 rounded-lg" href={'/client/addProducts/3'}>
              БУЦАХ
            </Link>
            <Button type="submit">ҮРГЭЛЖЛҮҮЛЭХ</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
