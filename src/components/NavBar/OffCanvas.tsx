'use client';

import Link from 'next/link';
import Image from 'next/image';
import XIcon from '../../../public/Images/common/close.png';

type PropType = {
  isOpen: boolean;
  onClose: () => void;
};

export default function OffCanvas({ isOpen, onClose }: PropType) {
  return (
    <div
      onClick={onClose}
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center transition-transform duration-500 ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className='bg-white p-4 absolute flex flex-col top-0 w-full'>
        <div className='self-end'>
          <Image src={XIcon} width={15} height={15} alt='x icon' />
        </div>
        <ul className='flex flex-col mt-2'>
          <Link href='/menu1'>
            <li className='text-center py-2 cursor-pointer'>Menu1</li>
          </Link>
          <Link href='/menu2'>
            <li className='text-center py-2 cursor-pointer'>Menu2</li>
          </Link>
          <Link href='/menu3'>
            <li className='text-center py-2 cursor-pointer'>Menu3</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
