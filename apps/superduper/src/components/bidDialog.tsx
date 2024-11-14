import { Button } from './ui/button';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  bid: number;
};

export const BidDialog = ({ open, setOpen, bid }: Props) => {
  return (
    <div className="bg-white fixed z-50 left-[50%] opacity-100 top-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div className="sm:max-w-md py-6 text-center content-center px-6 text-[#000000]">
        <div className="text-center text-lg">Үүнийг өөрийн болгоход нэг алхам ойртлоо</div>
        <div className="text-3xl">₮ {bid}</div>
        <div className="text-sm mt-4 text-[#565b60]">
          Сануулахад, бүх үнийн санал хуулийн дагуу заавал дагаж мөрдөх ёстой хүчин төгөлдөр үнэ болно. Хэрэв та хамгийн өндөр үнийн санал өгсөн бол энэ объектын төлбөрийг төлөхийг зөвшөөрч байгаа
          болно.
        </div>
        <Button type="submit" className="bg-blue-400 hover:bg-blue-500 text-white w-full mt-4">
          Үнийн санал оруулах
        </Button>
        <Button onClick={() => setOpen(false)} className="text-blue-600 hover:bg-white w-full bg-white hover:text-blue-500">
          цуцлах
        </Button>
      </div>
    </div>
  );
};
