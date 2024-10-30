import Footer from '../components/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <div>
        <Footer />
      </div>
    </div>
  );
}
