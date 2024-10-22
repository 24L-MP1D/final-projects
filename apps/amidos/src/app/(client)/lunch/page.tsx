import { Button } from '@/app/components/ui/button';
import Image from 'next/image';

export default function Lunch() {
  return (
    <div className="w-full mx-auto flex ">
      <div className="relative mx-auto ">
        <h1 className="text-4xl italic mx-auto">Онцлох Меню</h1>
        {/* carausel */}
        <h1 className="text-7xl italic  mb-10 mx-auto">Lunch set</h1>
        <div className="mt-20 mx-auto w-[1090px] flex flex-col lg:flex lg:flex-row  gap-20">
          <div className="w-[320px] h-[380px] border-2 border-[#8B0000]  absoulte w-full rounded-sm p-10 ">
            <Image src="/sassy.jpg" width={164} height={133} alt="Picture of the author" className="mx-auto rounded-full items-center" />
            <h1 className=" absolute text-[#8B0000] font-bold ">23$</h1>
            <h1 className="font-bold absolute mt-6">Steak salad</h1>
            <h2 className=" mt-14">Shpaggetthi, egg,butter, souce</h2>
            <div className="flex flex-row mt-8 gap-5 items-center">
              <Button variant="amidos" className="row-1 ">
                Сагс
              </Button>
              <Button variant="amidos2" className="row-1">
                Захиалах
              </Button>
            </div>
          </div>
          <div className="w-[320px] h-[380px] border-2 border-[#8B0000]  absoulte w-full rounded-sm p-10 ">
            <Image src="/sassy.jpg" width={164} height={133} alt="Picture of the author" className="mx-auto rounded-full items-center" />
            <h1 className=" absolute text-[#8B0000] font-bold ">23$</h1>
            <h1 className="font-bold absolute mt-6">Steak salad</h1>
            <h2 className=" mt-14">Shpaggetthi, egg,butter, souce</h2>
            <div className="flex flex-row mt-8 gap-5 items-center">
              <Button variant="amidos" className="row-1 ">
                Сагс
              </Button>
              <Button variant="amidos2" className="row-1">
                Захиалах
              </Button>
            </div>
          </div>
          <div className="w-[320px] h-[380px] border-2 border-[#8B0000]  absoulte w-full rounded-sm p-10 ">
            <Image src="/sassy.jpg" width={164} height={133} alt="Picture of the author" className="mx-auto rounded-full items-center" />
            <h1 className=" absolute text-[#8B0000] font-bold ">23$</h1>
            <h1 className="font-bold absolute mt-6">Steak salad</h1>
            <h2 className=" mt-14">Shpaggetthi, egg,butter, souce</h2>
            <div className="flex flex-row mt-8 gap-5 items-center">
              <Button variant="amidos" className="row-1 ">
                Сагс
              </Button>
              <Button variant="amidos2" className="row-1">
                Захиалах
              </Button>
            </div>
            <Button variant="amidos2" className="mt-20 mx-auto">
              Цааш үзэх
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
// /* Frame 18 */

/* Auto layout */
// display: flex;
// flex-direction: row;
// align-items: center;
// padding: 0px;
// gap: 16px;

// position: absolute;
// width: 200px;
// height: 40px;
// left: calc(50% - 200px/2 + 4.35px);
// top: 297.6px;

// transform: matrix(1, 0, 0, 1, 0, 0);