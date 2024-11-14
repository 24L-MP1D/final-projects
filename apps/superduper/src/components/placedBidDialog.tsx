import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader } from './ui/Dialog';
type Props = {
  secondDialog: boolean;
  setSecondDialog: (value: boolean) => void;
  bid: number;
};
export function PlacedBidDialog({ secondDialog, setSecondDialog, bid }: Props) {
  return (
    <Dialog open={secondDialog}>
      <DialogContent className="sm:max-w-md px-2 py-6 text-center content-center">
        <DialogHeader className="flex items-end">
          <X className="flex-1 hover:cursor-pointer " onClick={() => setSecondDialog(false)} />
        </DialogHeader>
        <div className="text-2xl">Та үнийн саналаа амжилттай байршууллаа</div>
        <div className="text-center text-3xl mb-2">₮ {bid}</div>
      </DialogContent>
    </Dialog>
  );
}
