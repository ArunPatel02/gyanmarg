'use client';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import NavItems from '../utils/NavItems';
import { ThemeSwitcher } from '../utils/ThemeSwitcher';
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi';
import CustomModal from '../utils/CustomModal';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';
import Verification from '../components/Auth/Verification';
import Image from 'next/image';
import avatar from '../../public/assests/avatar.png';
import { useSession } from 'next-auth/react';
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from '@/redux/features/auth/authApi';
import { toast } from 'react-hot-toast';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import Loader from './Loader/Loader';
import { useSelector } from 'react-redux';
import { BiSearch } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import Button from './atoms/buttons/Button';
import ProfileDropdown from './atoms/dropdown/ProfileDropdown';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  // const { token } = useSelector((state: any) => state.auth);
  const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined);

  const { data, status } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const [search, setSearch] = useState('');

  // const {} = useLogOutQuery(undefined, {
  //   skip: !logout ? true : false,
  // });

  useEffect(() => {
    if (!isLoading) {
      if (!userData) {
        if (data) {
          socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: data.user?.image,
          });
          refetch();
        }
      }
      if (data === null) {
        if (isSuccess) {
          toast.success('Login Successfully');
        }
      }
      if (data === null && !isLoading && !userData) {
        setLogout(true);
      }
    }
  }, [data, userData, isLoading]);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      // if (window.scrollY > 85) {
      if (window.scrollY > 25) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === 'screen') {
      {
        setOpenSidebar(false);
      }
    }
  };

  const handleSearch = () => {
    if (search === '') {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <>
      <div className='p-2 bg-blue-500 text-center font-semibold text-[15px]'>
        &quot;Backend Development in Node.js&quot; - Coming soon! Get ready to
        level up your skills! 🚀
        {/* We launched our first course, Docker Mastery From basic to advanced! 🎉 */}
        {/* <span className='underline pb-1 ml-1'>Learn more</span> 🎉 */}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='w-full sticky top-0 left-0  z-[80]'>
          <div
            // className={`${
            //   active
            //     ? 'dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-neutral-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500'
            //     : 'w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow'
            // }`}
            className={`${'bg-[#fffaa] dark:bg-[#091020aa] w-full h-[80px] border-b dark:border-[#ffffff1c] backdrop-blur-sm transition duration-500'}`}
          >
            <div className='w-[95%] 800px:w-[92%] m-auto h-full'>
              <div className='w-full h-[80px] flex items-center justify-between p-3'>
                <div className='flex'>
                  <Link
                    title='path of knowledge'
                    href={'/'}
                    className={`text-[28px] font-Poppins font-[600] text-black dark:text-white`}
                  >
                    Gyan
                    <span className='text-gradient text-[20px] font-[500]'>
                      Marg
                    </span>
                  </Link>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSearch();
                    }}
                    className='hidden 800px:flex items-center ml-4 rounded-lg shadow-sm dark:bg-gray-800 bg-slate-200'
                  >
                    <input
                      // className='bg-transparent  dark:placeholder:text-[#ffffffdd] rounded-[5px] px-4 py-2 transition-all w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[16px] font-[400] font-Josefin'
                      className='bg-transparent  dark:placeholder:text-[#ffffffdd] rounded-[5px] px-4 py-2 transition-all w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[16px] font-[400] font-Josefin'
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder='Search Courses...'
                    />
                    <button className='' type='submit'>
                      <BiSearch
                        className='text-black dark:text-white mr-2 cursor-pointer'
                        size={25}
                      />
                    </button>
                  </form>
                  {/* search bar start */}
                  {/* search bar end */}
                  {/* <div className='ml-3 min-w-[400px] bg-transparent relative'>
                    <input
                      type='search'
                      placeholder='Search Courses...'
                      // value={search}
                      // onChange={(e) => setSearch(e.target.value)}
                      className='bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[16px] font-[400] font-Josefin'
                    />
                    <div
                      className='absolute flex items-center justify-center w-[50px] cursor-pointer h-full right-0 top-0 bg-[#39c1f3] rounded-r-[5px]'
                      // onClick={handleSearch}
                    >
                      <BiSearch className='text-white' size={25} />
                    </div>
                  </div> */}
                  <ThemeSwitcher />
                </div>

                <div className='flex items-center'>
                  <NavItems activeItem={activeItem} isMobile={false} />
                  {/* only for mobile */}

                  {userData ? (
                    <>
                      <Link href={'/profile'}>
                        <Image
                          src={
                            userData?.user.avatar
                              ? userData.user.avatar.url
                              : avatar
                          }
                          alt=''
                          width={30}
                          height={30}
                          className='w-[30px] h-[30px] rounded-full cursor-pointer'
                          style={{
                            border:
                              activeItem === 5 ? '2px solid #37a39a' : 'none',
                          }}
                        />
                      </Link>
                      {/* <ProfileDropdown /> */}
                    </>
                  ) : (
                    <div className='hidden 800px:flex'>
                      {/* <HiOutlineUserCircle
                         size={25}
                         className='hidden 800px:block cursor-pointer dark:text-white text-black'
                         onClick={() => setOpen(true)}
                       /> */}
                      <Button
                        className='text-[#ffffffdd]'
                        onClick={() => {
                          setRoute('Login');
                          setOpen(true);
                        }}
                      >
                        Log in
                      </Button>
                      <Button
                        variant='primary'
                        className='mx-2 text-[#ffffffdd]'
                        onClick={() => {
                          setRoute('Sign-Up');
                          setOpen(true);
                        }}
                      >
                        Sign up
                      </Button>
                    </div>
                  )}
                  <div className='1100px:hidden ml-2'>
                    <HiOutlineMenuAlt3
                      size={25}
                      className='cursor-pointer dark:text-white text-black'
                      onClick={() => setOpenSidebar(true)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* mobile sidebar */}
            {openSidebar && (
              <div
                className='fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]'
                onClick={handleClose}
                id='screen'
              >
                <div className='w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0'>
                  <NavItems activeItem={activeItem} isMobile={true} />
                  {/* {userData?.user ? (
                    <Link href={'/profile'}>
                      <Image
                         src={
                          userData?.user.avatar
                            ? userData.user.avatar.url
                            : avatar
                        }
                        alt=''
                        width={30}
                        height={30}
                        className='w-[30px] h-[30px] rounded-full ml-[20px] cursor-pointer'
                        style={{
                          border:
                            activeItem === 5 ? '2px solid #37a39a' : 'none',
                        }}
                      />
                    </Link>
                  ) : (
                    <HiOutlineUserCircle
                      size={25}
                      className='hidden 800px:block cursor-pointer dark:text-white text-black'
                      onClick={() => setOpen(true)}
                    />
                  )} */}

                  {!userData && (
                    <div className='flex flex-col gap-4 px-5 mt-4'>
                      {/* <HiOutlineUserCircle
                         size={25}
                         className='hidden 800px:block cursor-pointer dark:text-white text-black'
                         onClick={() => setOpen(true)}
                       /> */}

                      <Button
                        className='text-[#ffffffdd]'
                        onClick={() => {
                          setRoute('Login');
                          setOpen(true);
                        }}
                      >
                        Log in
                      </Button>
                      <Button
                        className='text-[#ffffffdd]'
                        variant='primary'
                        onClick={() => {
                          setRoute('Sign-Up');
                          setOpen(true);
                        }}
                      >
                        Sign up
                      </Button>
                    </div>
                  )}
                  <br />
                  <br />
                  <p className='text-[16px] px-2 pl-5 text-black dark:text-white mt-auto'>
                    Copyright © 2023 GyanMarg
                  </p>
                </div>
              </div>
            )}
          </div>
          {route === 'Login' && (
            <>
              {open && (
                <CustomModal
                  open={open}
                  setOpen={setOpen}
                  setRoute={setRoute}
                  activeItem={activeItem}
                  component={Login}
                  refetch={refetch}
                />
              )}
            </>
          )}

          {route === 'Sign-Up' && (
            <>
              {open && (
                <CustomModal
                  open={open}
                  setOpen={setOpen}
                  setRoute={setRoute}
                  activeItem={activeItem}
                  component={SignUp}
                />
              )}
            </>
          )}

          {route === 'Verification' && (
            <>
              {open && (
                <CustomModal
                  open={open}
                  setOpen={setOpen}
                  setRoute={setRoute}
                  activeItem={activeItem}
                  component={Verification}
                />
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
