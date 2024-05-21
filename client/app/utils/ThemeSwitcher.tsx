'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { BiMoon, BiSun } from 'react-icons/bi';

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      // className='flex items-center justify-center mx-4 font-semibold border border-[#37a39a] dark:border-white px-3 py-1 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-[#37a39a]'
      className='flex items-center justify-center mx-4 font-semibold bg-slate-600 dark:bg-yellow-500 px-3 py-1 rounded-md cursor-pointer hover:opacity-90 text-white shadow-2xl'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? (
        <>
          <BiMoon
            className='cursor-pointer mr-1'
            fill='white'
            size={20}
            // onClick={() => setTheme('dark')}
          />
          DARK
        </>
      ) : (
        <>
          <BiSun
            size={20}
            fill='white'
            className='cursor-pointer mr-1'
            // onClick={() => setTheme('light')}
          />
          LIGHT
        </>
      )}
    </div>
  );
};
