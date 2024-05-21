import React, { use, useState } from 'react';
import { BiSearch } from 'react-icons/bi';

interface Props {
  placeholder?: string;
  handleSearch: (value: string) => void;
}
const RepoSearch = ({
  placeholder = 'Search...',
  handleSearch,
}: Props) => {
  const [search, setSearch] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(search);
      }}
      className='flex items-center border border-gray-400 rounded-lg'
    >
      <input
        className='bg-transparent  dark:placeholder:text-[#ffffffdd] rounded-[5px] px-4 py-2 transition-all w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[16px] font-[400] font-Josefin'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
      />
      <button className='' type='submit'>
        <BiSearch
          className='text-black dark:text-white mr-2 cursor-pointer'
          size={25}
        />
      </button>
    </form>
  );
};

export default RepoSearch;
