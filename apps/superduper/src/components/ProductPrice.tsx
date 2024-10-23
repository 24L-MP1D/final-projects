import { FormikErrors, FormikTouched } from 'formik';
import { ChangeEvent } from 'react';
import { FormValues } from './AddProductGeneral';
import { Input } from './ui/Input';
type Props = {
  formikValues: FormValues;
  formikTouched: FormikTouched<FormValues>;
  formikErrors: FormikErrors<FormValues>;
  formikHandleChange: (e: ChangeEvent) => void;
};
export const ProductPrice = ({ formikErrors, formikHandleChange, formikTouched, formikValues }: Props) => {
  return (
    <section className="pb-28">
      <header className="mt-16 mb-8 text-[#333333] text-2xl">Price</header>
      <div className="flex justify-between gap-2">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div className="text-[#23448d] text-sm mb-1.5">Price Paid*</div>
          </div>
          <div className="flex relative border-b-[1px]">
            <Input id="startBid" value={formikValues.startBid !== 0 ? formikValues.startBid : ''} onChange={formikHandleChange} maxLength={200} type="number" className="flex-1 border-none" />
            <p className={`absolute text-red-500 top-10 ${formikTouched.startBid && formikErrors.startBid ? 'block' : 'hidden'}`}>{formikErrors.startBid}</p>
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
  );
};
