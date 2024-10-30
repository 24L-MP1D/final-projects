'use client';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { CardBody, CardContainer, CardItem } from './ui/card';

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  starting_price: number;
  image_url: string;
}

export function ProductItem({ product, isFavourite, onClickFavourite }: { product: Product; isFavourite: boolean; onClickFavourite: () => void }) {
  return (
    <CardContainer containerClassName="p-0 !w-full h-auto" key={product.name}>
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full rounded-xl p-6 border h-auto">
        <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white flex justify-between w-full items-center">
          <p className="overflow-hidden text-nowrap text-ellipsis w-[200px]">{product.name}</p>
          <button onClick={onClickFavourite} className="rounded-full h-[40px] w-[40px] bg-white items-center flex justify-center text-[#0033FF]">
            <Heart size={22} strokeWidth={2} fill={isFavourite ? '#0033FF' : 'transparent'} />
          </button>
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm mt-2 dark:text-neutral-300">
          {product.description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image alt={product.image_url} src={product.image_url} width={100} height={100} className="!w-full !h-[200px] !object-cover" />
        </CardItem>
        <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white mt-5">
          {product.category}
        </CardItem>
        <CardItem translateZ="50" className="text-lg font-bold text-neutral-600 dark:text-white">
          {product.starting_price}$
        </CardItem>
        <div className="flex justify-between items-center">
          <CardItem translateZ={20} href="https://twitter.com/mannupaaji" target="__blank" className="py-2 rounded-xl text-xs font-normal dark:text-white">
            Bid now →
          </CardItem>
          <button>zahialah</button>
        </div>
      </CardBody>
    </CardContainer>
  );
}
