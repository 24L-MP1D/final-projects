import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-black  ">
      <div className="justify-center align-center w-[200px] ">
        <div className="">
          <h2 className="text-white">Not Found</h2>
          <p className="text-white">Please sign up first</p>
          <Link href="/" className="text-white">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
