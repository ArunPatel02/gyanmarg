'use client';
import React from 'react';
// import Heading from '@app/utils/Heading';
// import AdminSidebar from '@app/components/Admin/sidebar/AdminSidebar';
// import AdminProtected from '@app/hooks/adminProtected';
// import DashboardHero from '@app/components/Admin/DashboardHero';
// import { styles } from '@/app/styles/style';
// import { AiOutlineDelete } from 'react-icons/ai';
// import { BsLink45Deg } from 'react-icons/bs';
// import Button from '@/app/components/atoms/buttons/Button';
// import {
//   useGetVideoQuery,
//   useUpdateVideoMutation,
// } from '@/redux/features/video/videoApi';
// import { useParams, useRouter } from 'next/navigation';
// import { useFieldArray, useForm } from 'react-hook-form';
// import Link from 'next/link';
// import toast from 'react-hot-toast';

// type Props = {};

// const defaultValues = {
//   title: '',
//   videoUrl: '',
//   videoLength: 0,
//   description: '',
//   links: [{ title: '', url: '' }], // [{title: "", url: ""}]
// };
const page = () => {
  // const { id } = useParams();
  // const router = useRouter();
  // const { data: video, isLoading } = useGetVideoQuery(id);
  // const [updateVideo] = useUpdateVideoMutation();

  // const { register, handleSubmit, control } = useForm({
  //   defaultValues,
  //   values: video
  //     ? {
  //         title: video.title,
  //         videoUrl: video.videoUrl,
  //         videoLength: video.videoLength,
  //         description: video.description,
  //         links: video.links,
  //       }
  //     : defaultValues,
  // });
  // const { fields, append, remove } = useFieldArray({
  //   name: 'links',
  //   control,
  // });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // const onSubmit = async (data, more) => {
  //   console.log(data, more, 'data more');
  //   try {
  //     const response = await updateVideo({ id, ...data }).unwrap();
  //     toast.success(response.message);
  //   } catch (error) {}
  // };

  return (
    <div className='container p-4'>
      {/* <div className='flex items-center justify-between'>
        <span
          className='cursor-pointer'
          onClick={() => {
            router.back();
          }}
        >
          {'< '} Go Back
        </span>
        <div>
          <Button
            variant={video.published ? 'default' : 'primary'}
            onClick={async () => {
              try {
                const response = await updateVideo({
                  id,
                  published: !video.published,
                }).unwrap();
                toast.success(response.message);
              } catch (error) {
                console.log(error, 'error')
                toast.error(error.data.message);
              }
            }}
          >
            {video.published ? 'UnPublished' : 'Published'}
          </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-12'>
        <div className='my-3'>
          <label className={styles.label}>Video Title</label>
          <input
            {...register('title', { required: true })}
            type='text'
            placeholder='Project Plan...'
            className={`${styles.input}`}
          />
        </div>
        <div className='mb-3'>
          <label className={styles.label}>Video Url</label>
          <input
            {...register('videoUrl', { required: true })}
            type='text'
            placeholder='sdder'
            className={`${styles.input}`}
          />
        </div>
        <div className='mb-3'>
          <label className={styles.label}>Video Length (in minutes)</label>
          <input
            {...register('videoLength', { required: true })}
            type='number'
            placeholder='20'
            className={`${styles.input}`}
          />
        </div>

        <div className='mb-3'>
          <label className={styles.label}>Video Description</label>
          <textarea
            {...register('description')}
            rows={8}
            cols={30}
            placeholder='sdder'
            className={`${styles.input} !h-min py-2`}
          />
          <br />
        </div>
        {fields?.map((field: any, linkIndex: number) => (
          <div className='mb-3 block' key={linkIndex}>
            <div className='w-full flex items-center justify-between'>
              <label className={styles.label}>Link {linkIndex + 1}</label>
              <AiOutlineDelete
                className={`${
                  linkIndex === 0 ? 'cursor-no-drop' : 'cursor-pointer'
                } text-black dark:text-white text-[20px]`}
                onClick={() => remove(linkIndex)}
              />
            </div>
            <input
              type='text'
              placeholder='Source Code... (Link title)'
              className={`${styles.input}`}
              {...register(`links.${linkIndex}.title` as const)}
            />
            <input
              type='text'
              placeholder='Source Code Url... (Link URL)'
              className={`${styles.input} mt-6`}
              {...register(`links.${linkIndex}.url` as const)}
            />
          </div>
        ))}
        <br />
        <div className='inline-block mb-1'>
          <p
            className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'
            onClick={() => append({ title: '', url: '' })}
          >
            <BsLink45Deg className='mr-2' /> Add Link
          </p>
        </div>

        <div className='flex justify-end mb-12'>
          <Button variant='primary' className='ms-auto' type='submit'>
            Save
          </Button>
        </div>
      </form> */}
    </div>
  );
};

export default page;
