import { useFormik } from 'formik';
import * as yup from 'yup';

import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface FormValues {
  bid: number;
}

export const Bid = () => {
  const validationSchema = yup.object({
    bid: yup.number().required('Please insert a valid bid amount').min(1000, 'minumum bid is 1000'),
  });

  const formik = useFormik({
    initialValues: {
      bid: '',
    },
    onSubmit: async (values, { resetForm }) => {
      fetch('/api/hello', {
        method: 'POST',
        body: JSON.stringify({ bid: values.bid }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      resetForm();
    },
    validationSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>Closes in 4d 4h 04m 35s</div>
      <div className="border-l-2 border-b-2 border-slate-300">
        <div className="mt-3 border-t-2 border-blue-600 py-8 px-6">
          <div className="flex flex-col gap-2">
            <div className="text-sm">Current bid</div>
            <div className="font-bold text-3xl">€ 18,500</div>
            <div className="text-sm">Reserve price not met</div>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-8 px-4">
          <div className="flex gap-4">
            <div className="py-1 px-4 border-2 rounded-3xl hover:bg-slate-50 hover:cursor-pointer">3000</div>
            <div className="py-1 px-4 border-2 rounded-3xl hover:bg-slate-50 hover:cursor-pointer">3500</div>
            <div className="py-1 px-4 border-2 rounded-3xl hover:bg-slate-50 hover:cursor-pointer">4000</div>
          </div>
          <label className="border-solid bg-[#f8f7f8] flex gap-1 items-center py-1 px-3 w-full">
            <div className="text-slate-500">€</div>
            <Input
              id="bid"
              onChange={formik.handleChange}
              value={Number(formik.values.bid) !== 0 ? formik.values.bid : ''}
              className="w-full p-2 bg-[#f8f7f8]"
              placeholder="3,350 or up"
              type="number"
            />
          </label>
          {formik.touched.bid && formik.errors.bid && <p className="ml-8 text-red-500">{formik.errors.bid}</p>}
          <div className="flex gap-1 w-full">
            <Button type="submit" className="flex-1 border-[1px] py-2 px-4 bg-white text-blue-500 text-center">
              Place bid
            </Button>
            <Button type="submit" className="flex-1 border-[1px] py-2 px-4 bg-blue-600 text-white text-center">
              Set max bid
            </Button>
          </div>
        </div>
        <div className="mt-8 px-4">Buy confidently with our Buyer Protection</div>
        <div className="px-4 py-8 flex flex-col gap-2.5 border-b-2 border-slate-300">
          <div>€100 from France, arrives in 3-22 days</div>
          <div>Buyer Protection fee: 9% + € 3</div>
          <div>Closes: Saturday 18:01</div>
        </div>
        <div className="pt-8 px-4 flex flex-col gap-[40px]">
          <div className="flex justify-between">
            <div>Bidder 0835</div>
            <div>1 day ago</div>
            <div>€3,150</div>
          </div>
          <div className="mb-2">See all bids (7)</div>
        </div>
      </div>
    </form>
  );
};
