import { AuthProvider } from '@/components/components/AuthProvider';
import './global.css';

import { LoginByDialog } from '@/components/LoginByDialog';
import { ToastProvider } from '@/components/providers/toaster-provider';

// const myFont = localFont({
//   src: [
//     {
//       path: '/fonts/Pangolin-Regular.ttf',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '/fonts/Inter-VariableFont_opsz,wght.ttf',
//       weight: '700',
//       style: 'normal',
//     },
//   ],
//   variable: '--my-font',
// });

export const metadata = {
  title: 'verse.mn',
  description: 'Where love of teaching and learning comes together',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastProvider />
          <LoginByDialog />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
