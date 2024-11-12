import { Headers } from '@/components/header';
import Image from 'next/image';

export default function Menu() {
  return (
    <>
      <Headers />
      <div className="flex flex-col items-center">
        <Image src="/amido1.png" alt="Amidos Image" width={900} height={500} />
        <Image src="/amido2.png" alt="Amidos Image" width={900} height={500} />
        <Image src="/amido3.png" alt="Amidos Image" width={900} height={500} />
        <Image src="/amido4.png" alt="Amidos Image" width={900} height={500} />
        <Image src="/amido5.png" alt="Amidos Image" width={900} height={500} />
        <Image src="/amido6.png" alt="Amidos Image" width={900} height={500} />
        <Image src="/amido7.png" alt="Amidos Image" width={900} height={500} />
        <Image src="/amido8.png" alt="Amidos Image" width={900} height={500} />
        <Image src="/amido9.png" alt="Amidos Image" width={900} height={500} />
        <Image src="/amido10.png" alt="Amidos Image" width={900} height={500} />
        <Image src="/amido11.png" alt="Amidos Image" width={900} height={500} />
        <Image src="/amido12.png" alt="Amidos Image" width={900} height={500} />
        <Image src="/amido13.png" alt="Amidos Image" width={900} height={500} />
      </div>
    </>
  );
}
