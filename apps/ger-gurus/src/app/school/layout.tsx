import '@/app/global.css';
import { ToastProvider } from '@/components/providers/toaster-provider';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
  subsets: ['latin', 'cyrillic-ext'],
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'Verse school',
  description: 'verse.mn school site',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body className="bg-base-100 text-primary">
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
