'use client'

import { useTheme } from 'next-themes';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <button
        className='border-2 border-gray-950'
        onClick={() => setTheme('light')}
      >
        Light Mode
      </button>
      <button
        className='border-2 border-red-700'
        onClick={() => setTheme('dark')}
      >
        Dark Mode
      </button>
      <div>Current Theme is: {theme}</div>
    </>
  );
}
