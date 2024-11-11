'use client';

import Image from 'next/image';
import Link from 'next/link';
import OffCnavas from './OffCanvas';
import { useState } from 'react';
import ThemeSwitcher from '@/components/Switch/Theme';
import NavImage from '/public/Images/nav/menu.svg';
import NavFacIcon from '/public/Images/nav/ychong.png';

export default function NavBar() {
  const [offCanvasClicked, setOffCanvasClicked] = useState<boolean>(false);

  return (
    <nav className="flex items-center fixed z-10 top-0 h-12 w-full px-4 dark:bg-navbar-dark">
      <div className="max-w-screen-2xl mx-auto w-full flex flex-row justify-between items-center">
        <div className="flex flox-row items-center cursor-pointer">
          <Image
            style={{ marginRight: '8px' }}
            src={NavFacIcon}
            width={20}
            height={20}
            alt="nav face icon"
          />
          <Link href="/">To Be NFD: Chan's Devlog</Link>
        </div>
        <div
          onClick={() => setOffCanvasClicked(!offCanvasClicked)}
          className="md:hidden cursor-pointer dark:text-white"
        >
          <NavImage fill="currentColor" width={20} height={20} />
        </div>
        <OffCnavas
          isOpen={offCanvasClicked}
          onClose={() => setOffCanvasClicked(false)}
        />
        <div className="hidden md:block">
          <ul className="flex flex-row justify-center items-center">
            <li className="mr-4 cursor-pointer">
              <Link href="/about">About</Link>
            </li>
            <li className="mr-4 cursor-pointer">
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <ThemeSwitcher />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
