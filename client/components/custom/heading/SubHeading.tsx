import React from 'react';
import { FaListCheck } from 'react-icons/fa6';

const SubHeading = ({
  title,
  icon = null,
}: {
  title: string;
  icon: React.ReactNode | null;
}) => {
  return (
    <div className='flex items-center gap-3 mb-6'>
      <div className='bg-cyan-950 px-2 w-[45px] h-[45px] grid place-items-center rounded-full'>
        {icon}
      </div>
      <h2 className='text-2xl text-black dark:text-white'>{title}</h2>
    </div>
  );
};

export default SubHeading;
