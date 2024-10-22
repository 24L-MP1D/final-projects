import Header from '../components/layout/header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1200px] mx-auto ">
      <div>
        <Header />
        {children}
      </div>
    </div>
  );
}
