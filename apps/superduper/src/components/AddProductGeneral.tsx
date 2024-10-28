'use client';

import { FormikErrors, FormikTouched } from 'formik';
import { ChevronDown } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { AllCountry } from './allCountry';
import { Input } from './ui/Input';

export interface FormValues {
  countryOfOrigin: string;
  productName: string;
  additionalInformation: string;
  signatures: string;
  damage: string;
  restored: string;
  startBid: number;
  startDate: Date;
  endDate: Date;
}
type Props = {
  formikValues: FormValues;
  setShowCountry: (value: boolean) => void;
  formikTouched: FormikTouched<FormValues>;
  formikErrors: FormikErrors<FormValues>;
  formikHandleChange: (e: ChangeEvent) => void;
  showCountry: boolean;
  formikSetFieldValue: (name: string, value: string) => void;
};

export const AddProductGeneral = ({ formikValues, formikTouched, formikSetFieldValue, showCountry, formikHandleChange, formikErrors, setShowCountry }: Props) => {
  const [oneCountry, setOneCountry] = useState('');

  const [country, setCountry] = useState<string[]>([]);

  const includesFunction = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOneCountry(event.target.value.toLowerCase());
  };
  useEffect(() => {
    setCountry(AllCountry);
  }, []);
  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="flex justify-between items-center">
          <div className="text-[#23448d] text-sm mb-1.5">product name</div>
        </div>
        <div className="flex relative border-b-[1px]">
          <Input id="productName" value={formikValues.productName} onChange={formikHandleChange} maxLength={32} type="text" className="flex-1 border-none" />
          <p className={`absolute text-red-500 top-10 ${formikTouched.productName && formikErrors.productName ? 'block' : 'hidden'}`}>{formikErrors.productName}</p>
        </div>
      </div>
      <div>
        <div className="text-[#23448d] text-sm mb-1.5">Item's Country of Origin *</div>
        <div className="flex border-b-[1px] relative">
          <Input
            id="countryOfOrigin"
            value={formikValues.countryOfOrigin}
            onChange={(e) => {
              formikHandleChange(e);
              includesFunction(e);
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
          <p className={`absolute text-red-500 top-10 ${formikTouched.countryOfOrigin && formikErrors.countryOfOrigin ? 'block' : 'hidden'}`}>{formikErrors.countryOfOrigin}</p>
          {(showCountry || oneCountry) && (
            <div className="absolute z-50 top-10 w-full overflow-x-scroll border-[1px] border-blue-600 h-[300px] bg-[#ffffff] shadow">
              {country.map(
                (item) =>
                  item.toLowerCase().includes(oneCountry) && (
                    <div
                      key={item}
                      onClick={() => {
                        formikSetFieldValue('countryOfOrigin', item);

                        setOneCountry('');
                      }}
                      className="p-3  hover:bg-blue-600 hover:cursor-pointer"
                    >
                      {item}
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center">
          <div className="text-[#23448d] text-sm mb-1.5">Additional information *</div>
          <div>{formikValues.additionalInformation ? formikValues.additionalInformation.length : 0}/1000 characters</div>
        </div>
        <div className="border-b-[1px] relative">
          <Input id="additionalInformation" value={formikValues.additionalInformation} onChange={formikHandleChange} maxLength={1000} type="text" className="flex-1 border-none" />

          <p className={`absolute text-red-500 top-10 ${formikTouched.additionalInformation && formikErrors.additionalInformation ? 'block' : 'hidden'}`}>{formikErrors.additionalInformation}</p>
        </div>
      </div>
    </div>
  );
};
