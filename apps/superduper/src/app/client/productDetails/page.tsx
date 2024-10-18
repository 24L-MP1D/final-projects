'use client';

import { Bid } from '../../components/Bid';
import { HelpCenter } from '../../components/helpCenter';
import { ProductDetailImages } from '../../components/ProductDetailImages';
import { Safity } from '../../components/Safity';
export default function App() {
  return (
    <div className="max-w-[1240px] mx-auto w-full">
      <div className="flex gap-24">
        <ProductDetailImages />
        <div className="flex flex-col gap-8">
          <Bid />
          <Safity />
          <HelpCenter />
        </div>
      </div>
    </div>
  );
}
