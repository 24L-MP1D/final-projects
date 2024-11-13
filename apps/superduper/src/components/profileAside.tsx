import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const ProfileAside = ({ queryValue }: { queryValue: string }) => {
  const router = useRouter();
  const logOut = async () => {
    Cookies.remove('token');
    router.push('/client');
  };
  return (
    <div className="flex flex-col gap-4 max-w-[220px] w-full text-[#6b6b6b] min-h-screen ">
      <Link href={'/client/my-account/seller?seller=sl'} className={`text-base p-4 ${queryValue == 'sl' ? 'text-blue-400' : ''}`}>
        Худалдагчийн портал
      </Link>
      <div onClick={logOut} className="text-base p-4 hover:text-blue-400 hover:cursor-pointer">
        Бүртгэлээ гаргах
      </div>
    </div>
  );
};
