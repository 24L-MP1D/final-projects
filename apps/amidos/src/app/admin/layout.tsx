import LeftBar from './components/leftbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-slate-100">
      <LeftBar />
      {children}
      <div></div>
    </div>
  );
}
