'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import 'dotenv/config';
import { useFormik } from 'formik';
import { Camera, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import * as yup from 'yup';
const CLOUDINARYNAME = process.env.NEXT_PUBLIC_CLOUDINARYNAME;
const CLOUDINARYPRESET = process.env.NEXT_PUBLIC_CLOUDINARYPRESET || '';
export default function Page() {
  const [loading, setLoading] = useState('');
  const router = useRouter();
  const initialValues = {
    frontImage: '',
    backImage: '',
    detailImage: '',
    signatureImage: '',
    damageImage: '',
    additionalImage: '',
  };

  const validationSchema = yup.object().shape({
    frontImage: yup.mixed().required('image must be required'),
    backImage: yup.mixed().required('image must be required'),
    detailImage: yup.mixed().required('image must be required'),
  });

  const formik = useFormik({
    initialValues,
    onSubmit: (values, {}) => {
      const addProductObject = JSON.parse(localStorage.getItem('addProduct') || '{}');
      addProductObject.frontImage = values.frontImage;
      addProductObject.backImage = values.backImage;
      addProductObject.detailImage = values.detailImage;
      addProductObject.signatureImage = values.signatureImage;
      addProductObject.damageImage = values.damageImage;
      addProductObject.additionalImage = values.additionalImage;
      localStorage.setItem('addProduct', JSON.stringify(addProductObject));
      router.push('/client/addProducts/4');
    },
    validationSchema,
  });
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (!event.currentTarget.files?.length) return;
    setLoading(fieldName);
    const file = event.currentTarget.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARYPRESET);
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARYNAME}/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      formik.setFieldValue(fieldName, data.secure_url);
      setLoading('');
    } catch (err) {
      console.error('error upload to image', err);
    }
  };
  const handleFileDelete = async (fieldName: string) => {
    formik.setFieldValue(fieldName, null);
  };
  useEffect(() => {
    const addProductObject = JSON.parse(localStorage.getItem('addProduct') || '{}');
    if (addProductObject) {
      formik.setValues({
        frontImage: addProductObject.frontImage,
        backImage: addProductObject.backImage,
        detailImage: addProductObject.detailImage,
        signatureImage: addProductObject.signatureImage,
        damageImage: addProductObject.damageImage,
        additionalImage: addProductObject.additionalImage,
      });
    }
  }, []);
  return (
    <form onSubmit={formik.handleSubmit} className="pb-14">
      <div className="max-w-[50%] mx-auto mt-10">
        <div className="flex flex-col gap-1 max-w-[500px] mx-auto text-2xl">
          <div className="flex gap-2 items-center justify-center w-full text-[#00253e]">
            <div className="p-0.5 rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
            </div>
            <div className="bg-[#00253e] h-0.5 w-[70px]"></div>
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
          </div>
          <div className="flex gap-10 justify-center items-center">
            <div>Category</div>
            <div>Detail</div>
            <div>Photos</div>
            <div className="text-[#f3f3f3]">Logistics</div>
            <div className="text-[#f3f3f3]">Review</div>
          </div>
        </div>
        <div className="mt-8 text-center text-[#333] text-[48px] mb-16">Upload photos and documents</div>
        <div className="flex  gap-4 text-[#333333]">
          <div className="max-w-[600px] grid gap-6 grid-cols-2 w-full">
            <div className="hover:cursor-pointer text-center h-[420px] row-span-3 col-span-2 border-dashed border-[1px] flex flex-col justify-center items-center relative p-4">
              <div>
                <Camera />
              </div>
              <div>Click or drag and drop an image to upload</div>
              <div className="mt-10">Front</div>

              {formik.values.frontImage ? (
                <div className="absolute w-full flex h-full justify-between z-50 bg-white">
                  <Image src={formik.values.frontImage} alt="frontImage" width={1000} height={1000} className="w-full h-full object-cover" />
                  <div>
                    <X onClick={() => handleFileDelete('frontImage')} className="w-10 h-10 absolute right-0" />
                  </div>
                </div>
              ) : (
                <Input
                  id="frontImage"
                  type="file"
                  onChange={(e) => {
                    handleFileChange(e, 'frontImage');
                  }}
                  className="absolute w-full h-full opacity-0 z-30"
                />
              )}
              {loading === 'frontImage' && <Image className="absolute left-[50%] top-[50%] translate-x-[-50%]" src={'/images/spinner.svg'} alt="loading" width={40} height={40} />}
              {formik.touched.frontImage && formik.errors.frontImage && <p className="text-red-500">{formik.errors.frontImage}</p>}
            </div>
            <div className="hover:cursor-pointer h-[200px] text-center border-dashed border-[1px] flex flex-col justify-center items-center relative p-4">
              <div>
                <Camera />
              </div>
              <div>Click or drag and drop an image to upload</div>
              <div className="mt-10">Back</div>
              {formik.values.backImage ? (
                <div className="absolute w-full flex h-full justify-between z-50 bg-white">
                  <Image src={formik.values.backImage} alt="backImage" width={1000} height={1000} className="w-full h-full object-cover" />
                  <div>
                    <X onClick={() => handleFileDelete('backImage')} className="w-10 h-10 absolute right-0" />
                  </div>
                </div>
              ) : (
                <Input
                  id="backImage"
                  type="file"
                  onChange={(e) => {
                    handleFileChange(e, 'backImage');
                  }}
                  className="absolute w-full h-full opacity-0 z-30"
                />
              )}
              {loading === 'backImage' && <Image className="absolute left-[50%] top-[50%] translate-x-[-50%]" src={'/images/spinner.svg'} alt="loading" width={40} height={40} />}

              {formik.touched.backImage && formik.errors.backImage && <p className="text-red-500">{formik.errors.backImage}</p>}
            </div>
            <div className="hover:cursor-pointer text-center border-dashed border-[1px] flex flex-col justify-center items-center relative p-4">
              <div>
                <Camera />
              </div>
              <div>Click or drag and drop an image to upload</div>
              <div className="mt-10">Details</div>
              {formik.values.detailImage ? (
                <div className="absolute w-full flex h-full justify-between z-50 bg-white">
                  <Image src={formik.values.detailImage} alt="detailImage" width={1000} height={1000} className="w-full h-full object-cover" />
                  <div>
                    <X onClick={() => handleFileDelete('detailImage')} className="w-10 h-10 absolute right-0" />
                  </div>
                </div>
              ) : (
                <Input
                  id="detailImage"
                  type="file"
                  onChange={(e) => {
                    handleFileChange(e, 'detailImage');
                  }}
                  className="absolute w-full h-full opacity-0 z-30"
                />
              )}
              {loading === 'detailImage' && <Image className="absolute left-[50%] top-[50%] translate-x-[-50%]" src={'/images/spinner.svg'} alt="loading" width={40} height={40} />}

              {formik.touched.detailImage && formik.errors.detailImage && <p className="text-red-500">{formik.errors.detailImage}</p>}
            </div>
            <div className="hover:cursor-pointer text-center border-dashed border-[1px] flex flex-col justify-center items-center relative p-4">
              <div>
                <Camera />
              </div>
              <div>Click or drag and drop an image to upload</div>
              <div className="mt-10">Signature</div>
              {formik.values.signatureImage ? (
                <div className="absolute w-full flex h-full justify-between z-50 bg-white">
                  <Image src={formik.values.signatureImage} alt="signatureImage" width={1000} height={1000} className="w-full h-full object-cover" />
                  <div>
                    <X onClick={() => handleFileDelete('signatureImage')} className="w-10 h-10 absolute right-0" />
                  </div>
                </div>
              ) : (
                <Input
                  id="signatureImage"
                  type="file"
                  onChange={(e) => {
                    handleFileChange(e, 'signatureImage');
                  }}
                  className="absolute w-full h-full opacity-0 z-30"
                />
              )}
              {loading === 'signatureImage' && <Image className="absolute left-[50%] top-[50%] translate-x-[-50%]" src={'/images/spinner.svg'} alt="loading" width={40} height={40} />}

              {formik.touched.signatureImage && formik.errors.signatureImage && <p className="text-red-500">{formik.errors.signatureImage}</p>}
            </div>
            <div className="hover:cursor-pointer text-center border-dashed border-[1px] flex flex-col justify-center items-center relative p-4">
              <div>
                <Camera />
              </div>
              <div>Click or drag and drop an image to upload</div>
              <div className="mt-10">Damage</div>
              {formik.values.damageImage ? (
                <div className="absolute w-full flex h-full justify-between z-50 bg-white">
                  <Image src={formik.values.damageImage} alt="damageImage" width={1000} height={1000} className="w-full h-full object-cover" />
                  <div>
                    <X onClick={() => handleFileDelete('damageImage')} className="w-10 h-10 absolute right-0" />
                  </div>
                </div>
              ) : (
                <Input
                  id="damageImage"
                  type="file"
                  onChange={(e) => {
                    handleFileChange(e, 'damageImage');
                  }}
                  className="absolute w-full h-full opacity-0 z-30"
                />
              )}

              {loading === 'damageImage' && <Image className="absolute left-[50%] top-[50%] translate-x-[-50%]" src={'/images/spinner.svg'} alt="loading" width={40} height={40} />}

              {formik.touched.damageImage && formik.errors.damageImage && <p className="text-red-500">{formik.errors.damageImage}</p>}
            </div>
            <div className="hover:cursor-pointer text-center border-dashed border-[1px] flex flex-col justify-center items-center relative p-4">
              <div>
                <Camera />
              </div>
              <div>Click or drag and drop an image to upload</div>
              <div className="mt-10">Additional</div>

              {formik.values.additionalImage ? (
                <div className="absolute w-full flex h-full justify-between z-50 bg-white">
                  <Image src={formik.values.additionalImage} alt="additionalImage" width={1000} height={1000} className="w-full h-full object-cover" />
                  <div>
                    <X onClick={() => handleFileDelete('additionalImage')} className="w-10 h-10 absolute right-0" />
                  </div>
                </div>
              ) : (
                <Input
                  id="additionalImage"
                  type="file"
                  onChange={(e) => {
                    handleFileChange(e, 'additionalImage');
                  }}
                  className="absolute w-full h-full opacity-0 z-30"
                />
              )}
              {loading === 'additionalImage' && <Image className="absolute left-[50%] top-[50%] translate-x-[-50%]" src={'/images/spinner.svg'} alt="loading" width={40} height={40} />}

              {formik.touched.additionalImage && formik.errors.additionalImage && <p className="text-red-500">{formik.errors.additionalImage}</p>}
            </div>
          </div>
          <div>
            <div className=" pb-12 border-b-2 border-black">
              <div className="text-2xl">Tips:</div>
              <ol className="flex flex-col gap-4 list-decimal px-5">
                <li>One photo of entire item as close as possible</li>
                <li>One detail shot, 25% of item unless item very smal</li>
                <li>Take in bright day light. Turn on flash</li>
                <li>Take at slight angle off center to avoid reflection and flash back</li>
                <li>Check clarity on computer before uploading. Reshoot if not in focus</li>
                <li>Remove from glass when possible</li>
                <li>Show scale and context; details and texture</li>
                <li>Use your own photos: we cannot accept a photograph of a photo of the work</li>
              </ol>
            </div>
            <div className="mt-4">
              <div>Examples:</div>
              <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-4">
                <Image className="border-2" src={'/images/handbag.jpg'} alt="a" width={200} height={200} />
                <Image className="border-2" src={'/images/handbag.jpg'} alt="a" width={200} height={200} />
                <Image className="border-2" src={'/images/handbag.jpg'} alt="a" width={200} height={200} />
                <Image className="border-2" src={'/images/handbag.jpg'} alt="a" width={200} height={200} />
              </div>
            </div>
          </div>
          <div className="flex gap-2 w-full justify-center fixed bottom-0 bg-[#ffffff] py-2 left-[50%] translate-x-[-50%]">
            <div>Click “continue” to save your progress for this step</div>
            <Link className="bg-slate-300 text-center py-2 px-4 rounded-lg" href={'/client/addProducts/2'}>
              BACK
            </Link>
            <Button type="submit">CONTINUE</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
