import { FormikErrors, FormikTouched } from 'formik';
import { ChangeEvent } from 'react';
import { Input } from './ui/Input';
export interface FormValues {
  countryOfOrigin: string;
  productName: string;
  additionalInformation: string;
  signatures: string;
  damage: string;
  restored: string;
  startBid: number;
}
type Props = {
  formikValues: FormValues;
  formikTouched: FormikTouched<FormValues>;
  formikErrors: FormikErrors<FormValues>;
  formikHandleChange: (e: ChangeEvent) => void;
};
export const ProductCondition = ({ formikErrors, formikValues, formikHandleChange, formikTouched }: Props) => {
  return (
    <section className="">
      <header className="mt-16 mb-8 text-[#333333] text-2xl">Нөхцөл</header>
      <div className="flex flex-col gap-8">
        <div>
          <div className="flex justify-between items-center">
            <div className="text-[#23448d] text-sm mb-1.5">Гарын үсэг, шошго эсвэл тэмдэглэгээ *</div>
          </div>
          <div className="flex border-b-[1px] relative">
            <Input id="signatures" value={formikValues.signatures} onChange={formikHandleChange} maxLength={200} type="text" className="flex-1 border-none" />
            <p className={`absolute text-red-500 top-10 ${formikTouched.signatures && formikErrors.signatures ? 'block' : 'hidden'}`}>{formikErrors.signatures}</p>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <div className="text-[#23448d] text-sm mb-1.5">Гэмтэлтэй хэсэг *</div>
          </div>
          <div className="flex relative border-b-[1px]">
            <Input id="damage" value={formikValues.damage} onChange={formikHandleChange} maxLength={200} type="text" className="flex-1 border-none" />
            <p className={`absolute text-red-500 top-10 ${formikTouched.damage && formikErrors.damage ? 'block' : 'hidden'}`}>{formikErrors.damage}</p>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <div className="text-[#23448d] text-sm mb-1.5">Тухайн бараа сэргээгдсэн үү? Хэрэв тийм бол ямар хэмжээгээр?</div>
          </div>
          <div className="flex border-b-[1px] relative">
            <Input id="restored" value={formikValues.restored} onChange={formikHandleChange} maxLength={200} type="text" className="flex-1 border-none" />
            <p className={`absolute text-red-500 top-10 ${formikTouched.restored && formikErrors.restored ? 'block' : 'hidden'}`}>{formikErrors.restored}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
