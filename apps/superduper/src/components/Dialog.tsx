import { X } from 'lucide-react';
import Image from 'next/image';
import { Category } from './CategoryType';
import { Dialog, DialogContent } from './ui/Dialog';
type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  category: Category | undefined;
};
export function DialogComponent({ open, setOpen, category }: Props) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md px-2 py-6 flex flex-col justify-center text-center items-center">
        <div className="flex flex-1 items-center w-full justify-between px-16">
          <div className="text-2xl">{category?.category}</div>
          <X className="hover:cursor-pointer" onClick={() => setOpen(false)} />
        </div>
        <Image src={category?.image || '/'} alt="image" width={500} height={500} className="w-[300px] h-[300px] object-cover" />
        <div className="text-xl">{category?.description}</div>
      </DialogContent>
    </Dialog>
  );
}
