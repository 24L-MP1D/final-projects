import { Provider } from '@/components/provider';
import SignedIn from '@/components/signedin';
import { SignedOut } from '@/components/signedout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <div className="bg-slate-200 "></div>
      </div>
      <SignedIn>
        <Provider>{children}</Provider>
      </SignedIn>
      <SignedOut>
        <div>Hi</div>
      </SignedOut>
      <div></div>
    </div>
  );
}
