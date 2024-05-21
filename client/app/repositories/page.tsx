'use client';

import React, { useEffect, useState } from 'react';
import Protected from '../hooks/useProtected';
import { redirect } from 'next/navigation';
import Header from '../components/Header';
import Heading from '../utils/Heading';
import Footer from '../components/Footer';
import Loader from '../components/Loader/Loader';
import { useSearchParams } from 'next/navigation';
import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import { useGetReposQuery } from '@/redux/features/repository/repositoryApi';
import { styles } from '../styles/style';
import RepoSearch from '../components/Admin/Repository/RepoSearch';

const Repos = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get('title');
  const { data, isLoading } = useGetReposQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery('Categories', {});
  const [route, setRoute] = useState('Login');
  const [open, setOpen] = useState(false);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    if (data) setRepos(data.repos);
  }, [data]);

  const handleSearch = (value: string) => {
    if (value)
      setRepos(() => {
        return data.repos.filter((item: any) =>
          item.tags.join(' ').includes(value)
        );
      });
    else setRepos(data.repos);
  };

  return (
    <div className=''>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={3}
          />
          <div className='w-[95%] 800px:w-[85%] m-auto min-h-[70vh]'>
            <Heading
              title={'All repos - GyanMarg'}
              description={'GyanMarg is a programming community.'}
              keywords={
                'programming community, coding skills, expert insights, collaboration, growth'
              }
            />
            <h1 className='mt-5 w-[95%] font-Poppins text-[25px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[44px] text-[#000] font-[700] tracking-tight'>
              Solving the
              <span className='text-gradient italic'> Open Source Repo </span>
              Discovery Challenge
              <br />
              Your One-Stop
              <span className='text-gradient italic'> Solution </span>
            </h1>
            <div className='my-4 max-w-[350px]'>
              <RepoSearch
                placeholder='Search Repos...'
                handleSearch={handleSearch}
              />
            </div>
            <br />
            {repos.length === 0 && (
              <p
                className={`${styles.label} justify-center min-h-[50vh] flex items-center`}
              >
                {search
                  ? 'No courses found!'
                  : 'No courses found in this category. Please try another one!'}
              </p>
            )}
            {/* <br /> */}
            <div className='grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0'>
              {repos?.map((item: any, index: number) => (
                <div
                  onClick={() => {
                    window.open(item.url, '_blank');
                  }}
                  className='w-100 border border-gray-300 dark:border-gray-700 cursor-pointer hover:opacity-60 overflow-hidden shadow-lg rounded-lg max-h-fit bg-gradient-to-tr to-zinc-100 from-slate-500 dark:to-zinc-700 dark:from-slate-900'
                  key={item._id}
                >
                  <div className='px-6 py-4'>
                    <div className='font-bold text-gray-900 dark:text-gray-300 text-xl'>
                      {item.title}
                    </div>
                    {/* <p className='text-gray-700 text-base'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptatibus quia, nulla! Maiores et perferendis eaque,
                      exercitationem praesentium nihil.
                    </p> */}
                  </div>
                  <div className='px-6 pt-0 pb-2'>
                    {item.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className='inline-block bg-gray-200 rounded-full px-2 py-0.5 text-xs font-semibold text-gray-700 mr-2 mb-2'
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Repos;
