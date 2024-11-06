'use client';
import { FormikErrors, FormikTouched } from 'formik';
import { ChangeEvent, useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { FormValues } from './AddProductGeneral';
import { DatePickerWithRange } from './dateRange';
import { Input } from './ui/Input';
type Props = {
  formikValues: FormValues;
  formikTouched: FormikTouched<FormValues>;
  formikErrors: FormikErrors<FormValues>;
  formikHandleChange: (e: ChangeEvent) => void;
  formikSetFieldValue: (name: string, value: Date) => void;
};
export const ProductPrice = ({ formikErrors, formikHandleChange, formikSetFieldValue, formikTouched, formikValues }: Props) => {
  const [date, setDate] = useState<DateRange>();
  useEffect(() => {
    if (date?.from) formikSetFieldValue('startDate', date?.from);
    if (date?.to) formikSetFieldValue('endDate', date.to);
  }, [date]);
  return (
    <section className="pb-28">
      <header className="mt-16 mb-8 text-[#333333] text-2xl">Үнэ</header>
      <div className="flex justify-between gap-2">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div className="text-[#23448d] text-sm mb-1.5">Төлсөн үнэ*</div>
          </div>
          <div className="flex relative border-b-[1px]">
            <Input id="startBid" value={formikValues.startBid > 0 ? formikValues.startBid : ''} onChange={formikHandleChange} maxLength={200} type="number" className="flex-1 border-none" />
            <p className={`absolute text-red-500 top-10 ${formikTouched.startBid && formikErrors.startBid ? 'block' : 'hidden'}`}>{formikErrors.startBid}</p>
          </div>
        </div>
        <div className="flex-1">
          <div className="">
            <div className="text-[#23448d] text-sm mb-1.5">Валют*</div>
          </div>
          <div className="flex border-b-[1px] relative">
            <Input maxLength={200} type="text" className="flex-1 border-none" />
          </div>
        </div>
      </div>
      <header className="mt-16 mb-8 text-[#333333] text-2xl">Үнэ хэлэх огноо</header>

      <div className="text-xl">эхлэх огноо - дуусах огноо</div>
      <div>
        <DatePickerWithRange date={date} setDate={setDate} />
        {formikTouched.startDate && formikErrors.startDate && <p className="text-red-">{String(formikErrors.startDate)}</p>}
        {formikTouched.endDate && formikErrors.endDate && <p className="text-red-500">{String(formikErrors.endDate)}</p>}
      </div>
    </section>
  );
};
