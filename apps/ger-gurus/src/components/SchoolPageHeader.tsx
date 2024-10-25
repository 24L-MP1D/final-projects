import Image from 'next/image';

export const SchoolPageHeader = () => {
  return (
    <div className="p-4 sm:p-8 md:p-12 lg:p-16 flex">
      <div className="flex flex-col">
        <Image src={'/logo.png'} alt="school-logo" width={40} height={40} />
        <p className="font-bold text-xs">GER GURUS</p>
      </div>
      <div>category</div>
      <div>menu</div>
    </div>
  );
};
