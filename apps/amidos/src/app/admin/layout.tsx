import { AuthProvider } from '@/components/authprovider';
import { Protect } from '@/components/protect';
import SignedIn from '@/components/signedin';
import { SignedOut } from '@/components/signedout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AuthProvider>
        <div>
          <div className="bg-slate-200 "></div>
        </div>
        <SignedIn>
          <Protect role="admin">{children}</Protect>
        </SignedIn>
        <SignedOut>
          <div>Hi</div>
        </SignedOut>
        <div></div>
      </AuthProvider>
    </div>
  );
}
