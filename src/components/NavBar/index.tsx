'use client';

import Image from 'next/image';
import Link from 'next/link';
import NavImage from '../../../public/Images/nav/nav-menu.png';
import OffCnavas from './OffCanvas';
import { useState } from 'react';

export default function NavBar() {
  const [offCanvasClicked, setOffCanvasClicked] = useState<boolean>(false);

  return (
    <nav className='flex flex-row justify-between items-center py-3 px-4'>
      <div className='cursor-pointer'>
        <Link href='/'>This is Main Logo</Link>
      </div>
      <div
        onClick={() => setOffCanvasClicked(!offCanvasClicked)}
        className='2xl:hidden xl:hidden lg:hidden md:hidden cursor-pointer'
      >
        <Image width={20} height={20} src={NavImage} alt='Nav Image' />
      </div>
      <OffCnavas
        isOpen={offCanvasClicked}
        onClose={() => setOffCanvasClicked(false)}
      />
      <div className='hidden md:block'>
        <ul className='flex flex-row justify-center items-center'>
          <li className='mr-4 cursor-pointer'>
            <Link href='/menu1'>Menu1</Link>
          </li>
          <li className='mr-4 cursor-pointer'>
            <Link href='/menu2'>Menu2</Link>
          </li>
          <li className='cursor-pointer'>
            <Link href='/menu3'>Menu3</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
