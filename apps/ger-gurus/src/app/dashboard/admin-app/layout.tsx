import { SideBar } from '@/components/sidebar';
import Head from 'next/head';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="cupcake">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Pangolin&display=swap" rel="stylesheet" />
      </Head>
      <body className="bg-base-100 text-base-content font-pangolin">
        <SideBar children={children} />
      </body>
    </html>
  );
}
