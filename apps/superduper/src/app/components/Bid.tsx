import { useFormik } from 'formik';
import * as yup from 'yup';

import { Input } from './ui/Input';
import { Button } from './ui/button';

interface FormValues {
  bid: string;
}

export const Bid = () => {
  const validationSchema = yup.object({
    bid: yup.number().min(1000, 'too low price').required('une oruul'),
  });

  const formik = useFormik({
    initialValues: {
      bid: 0,
    },
    onSubmit: async (values, { resetForm }) => {
      fetch('/api/');
    },
    validationSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>4 өдөр 4 цаг 04 минут 35 секундын дараа хаагдана</div>
      <div className="border-l-2 border-b-2 border-slate-300">
        <div className="mt-3 border-t-2 border-blue-600 py-8 px-6">
          <div className="flex flex-col gap-2">
            <div className="text-sm">Одоогийн үнийн санал</div>
            <div className="font-bold text-3xl">18,500 евро</div>
            <div className="text-sm">Нөөцийн үнэ хангагдаагүй</div>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-8 px-4">
          <div>3,000</div>
          <label className="border-solid bg-[#f8f7f8] flex gap-1 items-center py-1 px-3 w-full">
            <div className="text-slate-500">евро</div>
            <Input id="bid" onChange={formik.handleChange} value={formik.values.bid !== 0 ? formik.values.bid : ''} className="w-full p-2 bg-[#f8f7f8]" placeholder="3,350 or up" type="number" />
          </label>
          <div className="flex gap-1 w-full">
            <Button className="flex-1 border-[1px] py-2 px-4 bg-white text-blue-500 text-center">Үнийн санал оруулах</Button>
            <Button type="submit" className="flex-1 border-[1px] py-2 px-4 bg-blue-600 text-white text-center">
              Хамгийн их үнийн саналыг тохируулах
            </Button>
          </div>
        </div>
        <div className="mt-8 px-4">Манай Худалдан авагчийн хамгаалалтаар итгэлтэйгээр худалдаж аваарай</div>
        <div className="px-4 py-8 flex flex-col gap-2.5 border-b-2 border-slate-300">
          <div>Францаас 100 евро, 3-22 хоногт ирнэ</div>
          <div>Худалдан авагчийн хамгаалалтын хураамж: 9% + 3 евро</div>
          <div>Хаах: Бямба гарагт 18:01</div>
        </div>
        <div className="pt-8 px-4 flex flex-col gap-[40px]">
          <div className="flex justify-between">
            <div>Үнийн саналд оролцогч 0835</div>
            <div>1 өдрийн өмнө</div>
            <div>3,150 евро</div>
          </div>
          <div className="mb-2">Бүх үнийн саналыг харах (7)</div>
        </div>
      </div>
    </form>
  );
};
