import Image from 'next/image';

const mockData = [
  {
    productName: 'Hermès - Kelly Mini - Handbag',
    productImage: ['/images/handbag.jpg', '/images/handbag.jpg', '/images/handbag.jpg', '/images/handbag.jpg', '/images/handbag.jpg'],
    productNo: 88884317,
  },
];

export const ProductDetailImages = () => {
  return (
    <div className="max-w-[750px] mx-auto w-full">
      <div>{mockData[0].productName}</div>
      <div>
        <div>NO. {mockData[0].productNo}</div>
        <div className="w-full grid gap-2 grid-cols-2">
          {mockData[0].productImage.map((image, index) => (
            <div className={`border-solid border-[1px] ${index == 2 ? 'col-span-2' : ''}`} key={image + index}>
              <Image src={image} alt="a" width={1000} height={1000} className={`object-cover shadow drop-shadow-xl`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
