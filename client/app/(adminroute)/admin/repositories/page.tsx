'use client';

import DashboardHero from '@app/components/Admin/DashboardHero';
import AdminProtected from '@app/hooks/adminProtected';
import Heading from '@app/utils/Heading';
import React, { useState } from 'react';
import AdminSidebar from '@app/components/Admin/sidebar/AdminSidebar';
import AllCourses from '@app/components/Admin/Course/AllCourses';
import {
  useAddRepoMutation,
  useGetReposQuery,
} from '@/redux/features/repository/repositoryApi';
import ALlRepositories from '@/app/components/Admin/Repository/Repositories';
import { styles } from '@/app/styles/style';

type Props = {};

const Repositories = (props: Props) => {
  const [addRepo] = useAddRepoMutation();

  const initial = { title: '', url: '', tags: '' };
  const [input, setInput] = useState(initial);

  const handleSubmit = async (e: any) => {
    console.log(input, 'input');
    e.preventDefault();
    try {
      await addRepo({
        title: input.title,
        url: input.url,
        tags: input.tags.split(','),
      });
      setInput(initial);
    } catch (error) {
      alert('something went wrong');
    }
  };
  return (
    <div>
      {/* <Heading
        title='GyanMarg - Admin'
        description='GyanMarg is a platform for students to learn and get help from teachers'
        keywords='Programming,MERN,Redux,Machine Learning'
      />
      <div className='flex h-screen'>
        <div className='1500px:w-[16%] w-1/5'>
          <AdminSidebar />
        </div>
        <div className='w-[85%]'>
          <DashboardHero /> */}
      <form
        onSubmit={handleSubmit}
        className={`${styles.label} w-[85%] mx-auto mt-20`}
      >
        <div className='w-full flex justify-between'>
          <div className='w-[45%]'>
            <label htmlFor=''>Repo Title</label>
            <input
              type='text'
              name='title'
              required
              value={input.title}
              onChange={(e: any) =>
                setInput((prev) => ({ ...prev, title: e.target.value }))
              }
              id='name'
              placeholder='MERN stack LMS platform with next 13'
              className={`
            ${styles.input}`}
            />
          </div>
          <div className='w-[50%]'>
            <label className={`${styles.label}`} htmlFor='email'>
              Repo Tags
            </label>
            <div className='flex'></div>

            <input
              className={`${styles.input}`}
              type='text'
              required
              name='tag'
              value={input.tags}
              onChange={(e: any) =>
                setInput((prev) => ({ ...prev, tags: e.target.value }))
              }
              id='tags'
              placeholder='MERN,Next 13,Socket io,tailwind css,LMS'
            />
          </div>
        </div>
        <br />
        <div className='w-full flex justify-between'>
          <div className='w-[100%]'>
            <label className={`${styles.label} w-[50%]`}>Demo Url</label>
            <input
              type='text'
              name='url'
              required
              value={input.url}
              onChange={(e: any) =>
                setInput((prev) => ({ ...prev, url: e.target.value }))
              }
              id='demoUrl'
              placeholder='https://www.github.com/xxxxxxxxxx'
              className={`
            ${styles.input}`}
            />
          </div>
          <div className='w-full flex items-center justify-end'>
            <input
              type='submit'
              value='Next'
              className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
            />
          </div>
        </div>
      </form>
      <ALlRepositories />
      {/* </div>
      </div> */}
    </div>
  );
};

export default Repositories;
