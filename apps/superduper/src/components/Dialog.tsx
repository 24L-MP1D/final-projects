import { X } from 'lucide-react';
import Image from 'next/image';
import { Category } from './CategoryType';
import { Dialog, DialogContent, DialogHeader } from './ui/Dialog';
type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  category: Category | undefined;
};
export function DialogComponent({ open, setOpen, category }: Props) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md px-2 py-6 text-center content-center">
        <DialogHeader className="flex items-end">
          <X className="flex-1 hover:cursor-pointer " onClick={() => setOpen(false)} />
        </DialogHeader>
        <div className="text-2xl">{category?.category}</div>
        <Image src={'/'} alt="image" width={500} height={500} className="w-[60%] h-[60%]" />
        <div className="text-xl">{category?.description}</div>
      </DialogContent>
    </Dialog>
  );
}
