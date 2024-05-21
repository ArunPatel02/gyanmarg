import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { FC } from 'react';
import Heading from '@app/utils/Heading';
import AdminSidebar from '@app/components/Admin/sidebar/AdminSidebar';
import AdminProtected from '@app/hooks/adminProtected';
import DashboardHero from '@app/components/Admin/DashboardHero';
import { styles } from '@/app/styles/style';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsLink45Deg } from 'react-icons/bs';
// import Button from '@/app/components/atoms/buttons/Button';
import {
  useGetVideoQuery,
  useUpdateVideoMutation,
} from '@/redux/features/video/videoApi';
import { useParams, useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import Link from 'next/link';
import toast from 'react-hot-toast';

type Props = any;

const defaultValues = {
  title: '',
  videoUrl: '',
  videoLength: 0,
  description: '',
  links: [{ title: '', url: '' }], // [{title: "", url: ""}]
};

const VideoEditModal: FC<Props> = ({ children, data, id }) => {
  const router = useRouter();
  const { data: video, isLoading } = useGetVideoQuery(id, {
    skip: !Boolean(id),
  });
  const [updateVideo] = useUpdateVideoMutation();

  const { register, handleSubmit, control, formState } = useForm({
    defaultValues,
    values: video
      ? {
          title: video.title,
          videoUrl: video.videoUrl,
          videoLength: video.videoLength,
          description: video.description,
          links: video.links,
        }
      : defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    name: 'links',
    control,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(formState.errors, 'errrors');

  const onSubmit = async (data: any, more: any) => {
    console.log(data, more, 'data more');
    try {
      data.videoLength = parseInt(data.videoLength);
      const response = await updateVideo({ id, ...data }).unwrap();
      toast.success(response.message);
    } catch (error) {}
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
        {/* <Button variant='outline'>Edit Profile</Button> */}
      </DialogTrigger>
      <DialogContent className=' max-h-[90vh] overflow-auto'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        {video && (
          <div className='container p-4'>
            <form onSubmit={handleSubmit(onSubmit)} className=''>
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
                <label className={styles.label}>
                  Video Length (in minutes)
                </label>
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

              <div className='flex mt-8 gap-4'>
                <Button variant='default' type='submit'>
                  Save
                </Button>
                <Button
                  variant={video.published ? 'destructive' : 'default'}
                  onClick={async () => {
                    try {
                      const response = await updateVideo({
                        id,
                        published: !video.published,
                      }).unwrap();
                      toast.success(response.message);
                    } catch (error: any) {
                      console.log(error, 'error');
                      toast.error(error.data.message);
                    }
                  }}
                >
                  {video.published ? 'UnPublished' : 'Published'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VideoEditModal;
