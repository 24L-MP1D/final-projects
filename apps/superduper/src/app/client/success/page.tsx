'use client';
import { ProductType } from '@/components/productType';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion'; // For optional animation
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Confetti from 'react-confetti';

export default function SubmissionPage() {
  const router = useRouter();
  const paramsId = useSearchParams();
  const id = paramsId.get('id');
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const [showAnimate, setShowAnimate] = useState(true);

  const [product, setProduct] = useState<ProductType>();

  const loadProduct = async () => {
    const response = await fetch(`/api/products/${id}`);
    const data = await response.json();
    setProduct(data);
  };

  const routerChange = () => {
    localStorage.removeItem('addProduct');
    router.push('/client/addProducts');
  };
  // To handle dynamic window resizing for confetti size
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    loadProduct();
    setTimeout(() => {
      setShowAnimate(false);
    }, 5000);
  }, []);
  return (
    <Suspense>
      <div className="min-h-screen" style={{ textAlign: 'center', padding: '20px' }}>
        <AnimatePresence>
          {showAnimate && (
            <>
              <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={300} />

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
                style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745', marginTop: '20px' }}
              >
                🎉 Баяр хүргэе! Таны илгээлт амжилттай боллоо! 🎉
              </motion.div>
            </>
          )}
        </AnimatePresence>
        {!showAnimate && (
          <div className="flex max-w-[500px] mt-5 mx-auto flex-col justify-center items-center gap-4">
            <div className="text-2xl">Таныг хүлээн авч байгаадаа баяртай байна!</div>
            <div className="text-xl">Та удахгүй баталгаажуулах имэйл болон дараагийн хийх алхмуудыг хүлээн авах болно. Таны илгээсэн мэдээлэлд ямар нэгэн шинэчлэлт орох тохиолдолд бид тантай холбогдох болно.</div>
            <div className="h-[2px] w-full bg-slate-200"></div>
            <div className="flex gap-2 items-center justify-center">
              <Image className="w-20 object-cover" src={product?.frontImage || '/'} alt="productimage" width={500} height={500} />
              <div>
                <div>{product?.productName}</div>
                <div>{product?.category}</div>
              </div>
            </div>
            <div
              className="flex gap-2
            "
            >
              <Button className="active:bg-black" onClick={routerChange}>
              ШИНЭ ЗҮЙЛ ИЛГЭЭХ
              </Button>
              <Button>ПОРТАЛ РУУ ОРОХ</Button>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
}
