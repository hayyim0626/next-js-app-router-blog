import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import Provider from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chans Dev log',
  description: 'Chans Dev Log',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='flex flex-col w-full max-w-screen-2xl mx-auto'>
        <Provider>
          <NavBar />
          <div className='pt-12'>{children}</div>
        </Provider>
      </body>
    </html>
  );
}
