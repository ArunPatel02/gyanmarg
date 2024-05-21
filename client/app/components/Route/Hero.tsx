'use client';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import Loader from '../Loader/Loader';
import { useRouter } from 'next/navigation';

type Props = {};

const Hero: FC<Props> = (props) => {
  const { data, isLoading } = useGetHeroDataQuery('Banner', {});
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (search === '') {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className=' mb-16 800px:h-[85vh] 800px:mb-0 flex justify-center pt-20 800px:items-center w-[90%] 800px:w-[80%] mx-auto'>
          <div className='blow'></div>
          {/* <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[40vh] left-5 w-[40vh] hero_animation rounded-[50%] 1100px:left-8 1500px:left-14"></div> */}
          {/* <div className='1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[70] z-10'> */}
          <div className='items-center justify-end z-10 '>
            <h1 className=' w-[95%] mx-auto text-center font-Poppins text-[24px] leading-[35px] sm:text-5xl lg:text-6xl dark:text-white 800px:!leading-[70px] text-[#000] font-[700] tracking-tight'>
              Unleash
              <span className='text-gradient'> Infinite Knowledge </span>
              <br /> at Your{' '}
              <span className='text-red-gradient'>Fingertips</span>
              {/* : A Gateway to */}
              {/* <span className='text-gradient'> Limitless </span>
              Learning <br />{' '} */}
            </h1>
            {/* <p className='w-[80%] mx-auto text-center pt-2 px-2 font-Poppins text-black dark:text-white'> */}
            <p className='w-[80%] mx-auto text-center 800px:block font-poppins 800px:leading-[28px] mb-8 text-[18px] 800px:text-[20px] leading-[23px] font-[400] dark:font-[300] text-black dark:text-gray-200 my-2 sm:mt-4 sm:mb-6'>
              Dive into a world of boundless discovery with our platform,
              offering an expansive gateway to limitless learning. Unleash
              infinite knowledge at your fingertips and embark on a journey of
              continuous growth and enlightenment.
            </p>

            <div className='1000px:w-[100%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left'>
              {/* <h2 className='dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60%] 1100px:w-[78%]'>
                {data?.layout?.banner?.title}
              </h2>
              <br />
              <p className='dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]'>
                {data?.layout?.banner?.subTitle}
              </p> */}
              {/* <br /> */}
              {/* <br /> */}
              {/* <div className='1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative'>
                <input
                  type='search'
                  placeholder='Search Courses...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin'
                />
                <div
                  className='absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]'
                  onClick={handleSearch}
                >
                  <BiSearch className='text-white' size={30} />
                </div>
              </div> */}
              {/* <br /> */}
              {/* <br /> */}

              {/* search input */}
              <div className='relative w-full sm:max-w-2xl sm:mx-auto bg-transparent mb-4 px-4'>
                <div
                  className='overflow-hidden z-0 rounded-full relative p-[4px]'
                  style={{
                    boxShadow: '3px 2px 14px #746c9b',
                  }}
                >
                  <form
                    role='form'
                    className='relative flex z-50 rounded-full'
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSearch();
                    }}
                  >
                    <input
                        // color: #ffffff;
                        // font-size: 18px;
                        // font-weight: 400;
                        // font-style: oblique;
                      type='text'
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder='Enter your search here...'
                      className='bg-white dark:bg-[#384766] rounded-s-full flex-1 px-6 py-4 text-gray-700 focus:outline-none placeholder:text-dark placeholder:text-lg font-sans dark:text-white dark:placeholder:text-white'
                    />
                    <button
                      type='submit'
                      className='bg-indigo-500 text-white rounded-e-full font-semibold px-6 py-4 hover:bg-indigo-400 focus:bg-indigo-600 focus:outline-none'
                    >
                      Search
                      {/* <BiSearch
                        className='hover:text-slate-100 hover:scale-90 transition-all text-white'
                        size={30}
                      /> */}
                    </button>
                    {/* <button className=' text-white rounded-full font-semibold px-4 py-4 focus:outline-none'>
                      <BiSearch
                        className='hover:text-slate-100 hover:scale-90 transition-all text-white'
                        size={30}
                      />
                    </button> */}
                  </form>
                  <div className='glow glow-1 z-10 bg-pink-400 absolute'></div>
                  <div className='glow glow-2 z-20 bg-purple-400 absolute'></div>
                  <div className='glow glow-3 z-30 bg-yellow-400 absolute'></div>
                  <div className='glow glow-4 z-40 bg-blue-400 absolute'></div>
                </div>
              </div>
              {/*  */}
              {/* <div className='sm:flex items-center'>
                <div
                  // className='flex items'
                  className='flex justify-center '
                >
                  <Image
                    src={require('../../../public/assests/client-1.jpg')}
                    alt=''
                    className='rounded-full'
                  />
                  <Image
                    src={require('../../../public/assests/client-2.jpg')}
                    alt=''
                    className='rounded-full ml-[-20px]'
                  />
                  <Image
                    src={require('../../../public/assests/client-3.jpg')}
                    alt=''
                    className='rounded-full ml-[-20px]'
                  />
                </div>
                <p className='font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]'>
                  500K+ People already trusted us.{' '}
                  <Link
                    href='/courses'
                    className='dark:text-[#46e256] text-[crimson]'
                  >
                    View Courses
                  </Link>{' '}
                </p>
              </div> */}
            </div>
            {/* <Image
          src={data?.layout?.banner?.image?.url}
          width={400}
          height={400}
          alt=""
          className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
        /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;

{
  /* <div className="w-full 1000px:flex items-center">
<div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[40vh] left-5 w-[40vh] hero_animation rounded-[50%] 1100px:left-8 1500px:left-14"></div>
<div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
  <Image
    src={data?.layout?.banner?.image?.url}
    width={400}
    height={400}
    alt=""
    className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
  />
</div>
<div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
  <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60%] 1100px:w-[78%]">
    {data?.layout?.banner?.title}
  </h2>
  <br />
  <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]">
   {data?.layout?.banner?.subTitle}
  </p>
  <br />
  <br />
  <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
    <input
      type="search"
      placeholder="Search Courses..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
    />
    <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"
    onClick={handleSearch}
    >
      <BiSearch className="text-white" size={30} />
    </div>
  </div>
  <br />
  <br />
  <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
    <Image
      src={require("../../../public/assests/client-1.jpg")}
      alt=""
      className="rounded-full"
    />
    <Image
      src={require("../../../public/assests/client-2.jpg")}
      alt=""
      className="rounded-full ml-[-20px]"
    />
    <Image
      src={require("../../../public/assests/client-3.jpg")}
      alt=""
      className="rounded-full ml-[-20px]"
    />
    <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]">
      500K+ People already trusted us.{" "}
      <Link
        href="/courses"
        className="dark:text-[#46e256] text-[crimson]"
      >
        View Courses
      </Link>{" "}
    </p>
  </div>
  <br />
</div>
</div> */
}
