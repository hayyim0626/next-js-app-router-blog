import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import Providers from './providers';

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
    <html lang="en">
      <body className="dark:bg-page-dark">
        <Providers>
          <NavBar />
          <main className="pt-16 max-w-screen-2xl mx-auto h-full">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
