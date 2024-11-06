import '@/app/global.css';

import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
  subsets: ['latin', 'cyrillic-ext'],
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'Verse.mn',
  description: 'Welocome to verse.mn',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
