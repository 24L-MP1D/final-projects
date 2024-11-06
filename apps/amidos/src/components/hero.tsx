'use client';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch';
import Header from '../app/components/header';
import { Button } from '../app/components/ui/button';

const searchClient = algoliasearch('MLKXEEH303', 'dc3895feeae585b208d713220c7e40d8');

export default function Hero() {
  const router = useRouter();
  const [searchid, setSearchid] = useState('');

  const [searcheddata, setSearcheddata] = useState('');

  const [searchValue, setSearchvalue] = useState('');
  const onStateChange = ({ uiState, setUiState }: Props) => {
    setUiState(uiState);
    setSearchvalue(uiState.amidos.query);
  };

  function searchfunction(id: string) {
    setSearchid(id);
    pushtoRouter(id);
  }

  function pushtoRouter(id?: string) {
    if (id && id.length > 1) {
      return router.push(`/lunch?searchvalue=${id}`);
    } else {
      router.push(`/lunch?searchvalue=${searchValue}`);
    }
  }

  function Hit({ hit }: { hit: any }) {
    return (
      <article className="content bg-white flex flex-col gap-4">
        <button className="card flex gap-4 px-6 py-2 border-2" onClick={() => searchfunction(hit.id)}>
          <Image src={hit.photos} alt={hit.name} width={50} height={50} className="rounded-md w-12 h-12" />
          <div>
            <p className="text-[#8B0000] text-xl">{hit.name}</p>
            <h1 className="text-[#52071B] text-base">{hit.ingredients}</h1>
          </div>
        </button>
      </article>
    );
  }
  type Props = {
    uiState: any;
    setUiState: any;
  };

  return (
    <Suspense>
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
                <InstantSearch onStateChange={onStateChange} searchClient={searchClient} indexName="amidos">
                  <SearchBox
                    onSubmit={(event) => {
                      console.log(123);
                    }}
                    className="p-2 rounded-sm bg-white"
                    searchAsYouType={true}
                    placeholder="Хайлт..."
                    onKeyDown={(e) => e.key === 'Enter' && pushtoRouter()}
                  />
                  <Hits hitComponent={Hit} className={`${searchValue && searchValue.length > 1 ? 'block absolute z-10 md:min-w-[308px] min-w-[274px]' : 'hidden'}`} />
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
    </Suspense>
  );
}
