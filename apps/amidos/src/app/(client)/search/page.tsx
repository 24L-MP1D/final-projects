'use client';

import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { Hits, InstantSearch, Pagination, SearchBox } from 'react-instantsearch';

const searchClient = algoliasearch('MLKXEEH303', 'dc3895feeae585b208d713220c7e40d8');

export default function Search() {
  function Hit({ hit }: { hit: any }) {
    return (
      <article>
        <img src={hit.image} alt={hit.name} />
        <p>{hit.information}</p>
        <h1>{hit.addTag}</h1>
      </article>
    );
  }
  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName="ecommerce">
        <SearchBox className="border border-white text-white" />
        <Hits hitComponent={Hit} />
        <Pagination />
      </InstantSearch>
    </div>
  );
}
