'use client';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch';
import Header from '../app/components/header';
import { Button } from '../app/components/ui/button';

const searchClient = algoliasearch('MLKXEEH303', 'dc3895feeae585b208d713220c7e40d8');

export default function Hero() {
  const router = useRouter();
  const [searchid, setSearchid] = useState('');
  
  const [searcheddata, setSearcheddata] = useState('');
  console.log(searchid);

  function searchfunction({ name }: { name: string }) {
    console.log(name);
    setSearchid(name);
    pushtoRouter();
  }
  function pushtoRouter() {
    router.push(`/products?searchvalue=${searchid}`);
  }

  function Hit({ hit }: { hit: any }) {
    return (
      <article className="content bg-white">
        <button className="card" onClick={() => searchfunction(hit.name)}>
          <img src={hit.image} alt={hit.name} />
          <div className="">
            <p>{hit.information}</p>
            <h1>{hit.addTag}</h1>
          </div>
        </button>
        <button>
          <img src={hit.image} alt={hit.name} />
          <p>{hit.information}</p>
          <h1>{hit.addTag}</h1>
        </button>
      </article>
    );
  }

  return (
    <div className="md:h-[100vh] w-full aspect-video relative overflow-hidden flex fex-col">
      <Image src="/restaurant.jpeg" alt="Image of restaurant" width={1440} height={820} className="h-full w-full object-cover" />
      <div className="absolute top-0 right-0 left-0 flex md:justify-center justify-end">
        <Header />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="backdrop-blur-md md:pt-16 md:pb-20 md:px-20 pt-8 pb-10 px-10 flex flex-col text-center md:gap-10 gap-6">
          <div className="flex flex-col text-center gap-7">
            <div className="text-white md:text-6xl font-bold text-4xl">AMIDO'S</div>
            <div>
              <InstantSearch searchClient={searchClient} indexName="ecommerce">
                <SearchBox className="p-2 rounded-xl bg-white" searchAsYouType={true} placeholder="Хайлт..." onKeyDown={(e) => (e.key === 'Enter' ? searchfunction() : '')} />
                <Hits hitComponent={Hit} />
              </InstantSearch>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/tablebook">
              <Button className="bg-white hover:bg-slate-300 text-[#52071B] md:text-sm text-xs">ШИРЭЭ ЗАХИАЛГА</Button>
            </Link>
            <Link href="/lunch">
              <Button className="bg-[#C41D4A] hover:bg-[#8B0000] md:text-sm text-xs">ХООЛ ХҮРГЭЛТ</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
