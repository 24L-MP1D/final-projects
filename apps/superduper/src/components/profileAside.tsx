import Link from 'next/link';

export const ProfileAside = ({ queryValue }: { queryValue: string }) => {
  return (
    <div className="flex flex-col gap-4 max-w-[220px] w-full text-[#6b6b6b] min-h-screen ">
      <Link href={'/my-account/profile'} className="text-base p-4">
        Profile
      </Link>
      <Link href={'/my-account/auctions'} className="text-base p-4">
        Auctions
      </Link>
      <Link href={'/my-account/bids'} className="text-base p-4">
        Bids
      </Link>
      <Link href={'/my-account/purchases'} className="text-base p-4">
        Purchases
      </Link>
      <Link href={'/client/my-account/seller?seller=sl'} className={`text-base p-4 ${queryValue == 'sl' ? 'text-blue-400' : ''}`}>
        Seller Portal
      </Link>
    </div>
  );
};
