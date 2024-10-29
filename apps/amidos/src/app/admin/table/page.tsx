import { Button } from '@/components/ui/button';
import LeftBar from '../components/leftbar';

export default function Table() {
  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="flex gap-5">
        <LeftBar />
        <div className="w-full mt-6">
          <div className="flex justify-between">
            <div className="font-bold text-xl">Ширээ захиалга</div>
            <Button>add table</Button>
          </div>
          <div className="relative">
            <div className="absolute z-10">
              <img src="" alt="" />
            </div>
            <div className="absolute z-10">Object map</div>
          </div>
        </div>
      </div>
    </div>
  );
}
