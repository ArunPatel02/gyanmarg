import { styles } from '@/app/styles/style';
import CoursePlayer from '@/app/utils/CoursePlayer';
import Ratings from '@/app/utils/Ratings';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IoCheckmarkDoneOutline, IoCloseOutline } from 'react-icons/io5';
import { MdOutlineOndemandVideo } from 'react-icons/md';
import { format } from 'timeago.js';
import CourseContentList from '../Course/CourseContentList';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from '../Payment/CheckOutForm';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import Image from 'next/image';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { useCreateOrderMutation } from '@/redux/features/orders/ordersApi';
import socketIO from 'socket.io-client';
import { redirect } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { BiTime } from 'react-icons/bi';

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || '';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

type Props = {
  data: any;
  stripePromise: any;
  clientSecret: string;
  setRoute: any;
  setOpen: any;
};

export const CourseIncludes = ({
  lesson_count = 0,
  test_count = 0,
}: {
  lesson_count: number;
  test_count: number;
}) => {
  return (
    <>
      <h3 className='text-black dark:text-white text-lg font-semibold'>
        What&apos;s included
      </h3>
      <p className='pb-1 text-black dark:text-white'>
        • {lesson_count} Lessons
      </p>
      <p className='pb-1 text-black dark:text-white'>• {test_count} Test</p>
    </>
  );
};

const CourseDetails = ({
  data,
  stripePromise,
  clientSecret,
  setRoute,
  setOpen: openAuthModal,
}: Props) => {
  const { token } = useSelector((state: any) => state.auth);
  console.log(token, 'token --');
  const { data: userData, refetch } = useLoadUserQuery(undefined, {
    // skip: !token
  });
  // let userData:any;
  console.log(userData, 'userdata -- ');
  const [user, setUser] = useState<any>();
  const [open, setOpen] = useState(false);
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const dicountPercentenge = data?.estimatedPrice
    ? ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100
    : 100;
  console.log(data, dicountPercentenge, 'data');
  const discountPercentengePrice = dicountPercentenge.toFixed(0);
  console.log(discountPercentengePrice, 'discountPercentengePrice');
  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

  const handleOrder = (e: any) => {
    if (user) {
      // setOpen(true);
      console.log(data, 'data');
      createOrder({ courseId: data._id });
    } else {
      setRoute('Login');
      openAuthModal(true);
    }
  };

  useEffect(() => {
    if (orderData) {
      refetch();
      socketId.emit('notification', {
        title: 'New Order',
        message: `You have a new order from ${data.name}`,
        userId: user._id,
      });
      redirect(`/course-access/${data._id}`);
    }
    if (error) {
      if ('data' in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [orderData, error]);

  const lessonCount = useMemo(() => {
    console.log('count lesson count');
    if (data?.sections.length > 0) {
      const count = data.sections.reduce(
        (accumulator: any, currentValue: any) =>
          accumulator + currentValue.videos.length,
        0
      );
      return count;
    } else return 0;
  }, [data]);

  return (
    <div>
      <div className='py-2 bg-red-500 text-center font-semibold text-[15px]'>
        We are currently working on the course content. More content will be
        available soon. Thank you for your patience.
      </div>
      <div className='w-[90%] 800px:w-[90%] m-auto py-5'>
        <div className='w-full flex flex-col-reverse 800px:flex-row'>
          <div className='w-full 800px:w-[65%] 800px:pr-5'>
            <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
              {data.name}
            </h1>
            <div className='flex items-center justify-between pt-3'>
              <div className='flex items-center'>
                <Ratings rating={data.ratings} />
                <h5 className='text-black dark:text-white'>
                  {data.reviews?.length} Reviews
                </h5>
              </div>
              <h5 className='text-black dark:text-white'>
                {data.purchased} Students
              </h5>
            </div>
            {/* description */}
            <p className='text-[18px] mt-[20px] w-full overflow-hidden text-black dark:text-white'>
              {data.description}
            </p>

            <br />
            <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
              What you will learn from this course?
            </h1>
            <div>
              {data.benefits?.map((item: any, index: number) => (
                <div
                  className='w-full flex 800px:items-center py-2'
                  key={index}
                >
                  <div className='w-[15px] mr-1'>
                    <IoCheckmarkDoneOutline
                      size={20}
                      className='text-black dark:text-white'
                    />
                  </div>
                  <p className='pl-2 text-black dark:text-white'>
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
            </div>
            <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
              What are the prerequisites for starting this course?
            </h1>
            {data.prerequisites?.map((item: any, index: number) => (
              <div className='w-full flex 800px:items-center py-2' key={index}>
                <div className='w-[15px] mr-1'>
                  <IoCheckmarkDoneOutline
                    size={20}
                    className='text-black dark:text-white'
                  />
                </div>
                <p className='pl-2 text-black dark:text-white'>{item.title}</p>
              </div>
            ))}
            <br />
            <br />
            <div>
              <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                Course Overview
              </h1>
              <CourseContentList data={data?.courseData} isDemo={true} />
            </div>
            <br />
            <br />
            {/* course description */}
            <div className='w-full'>
              {/* <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                Course Details
              </h1> */}
              {/* <p className='text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white'> */}
              {/* <p className='text-[18px] mt-[20px] w-full overflow-hidden text-black dark:text-white'>
                {data.description}
              </p> */}
            </div>
            <br />
            <br />
            <div className='w-full'>
              <div className='800px:flex items-center'>
                <Ratings rating={data?.ratings} />
                <div className='mb-2 800px:mb-[unset]' />
                <h5 className='text-[25px] font-Poppins text-black dark:text-white'>
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(2)}{' '}
                  Course Rating • {data?.reviews?.length} Reviews
                </h5>
              </div>
              <br />
              {(data?.reviews && [...data.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div className='w-full pb-4' key={index}>
                    <div className='flex'>
                      <div className='w-[50px] h-[50px]'>
                        <Image
                          src={
                            item.user.avatar
                              ? item.user.avatar.url
                              : 'https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png'
                          }
                          width={50}
                          height={50}
                          alt=''
                          className='w-[50px] h-[50px] rounded-full object-cover'
                        />
                      </div>
                      <div className='hidden 800px:block pl-2'>
                        <div className='flex items-center'>
                          <h5 className='text-[18px] pr-2 text-black dark:text-white'>
                            {item.user.name}
                          </h5>
                          <Ratings rating={item.rating} />
                        </div>
                        <p className='text-black dark:text-white'>
                          {item.comment}
                        </p>
                        <small className='text-[#000000d1] dark:text-[#ffffff83]'>
                          {format(item.createdAt)} •
                        </small>
                      </div>
                      <div className='pl-2 flex 800px:hidden items-center'>
                        <h5 className='text-[18px] pr-2 text-black dark:text-white'>
                          {item.user.name}
                        </h5>
                        <Ratings rating={item.rating} />
                      </div>
                    </div>
                    {item.commentReplies.map((i: any, index: number) => (
                      <div className='w-full flex 800px:ml-16 my-5' key={index}>
                        <div className='w-[50px] h-[50px]'>
                          <Image
                            src={
                              i.user.avatar
                                ? i.user.avatar.url
                                : 'https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png'
                            }
                            width={50}
                            height={50}
                            alt=''
                            className='w-[50px] h-[50px] rounded-full object-cover'
                          />
                        </div>
                        <div className='pl-2'>
                          <div className='flex items-center'>
                            <h5
                              // className='text-[20px]'
                              className='text-[18px] pr-2 text-black dark:text-white'
                            >
                              {i.user.name}
                            </h5>{' '}
                            <VscVerifiedFilled className='text-[#0095F6] ml-2 text-[20px]' />
                          </div>
                          <p className='text-black dark:text-white'>
                            {i.comment}
                          </p>
                          <small
                            // className='text-[#ffffff83]'
                            className='text-[#000000d1] dark:text-[#ffffff83]'
                          >
                            {format(i.createdAt)} •
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
          <div className='w-full 800px:w-[35%] relative'>
            <div className='sticky top-[100px] left-0 z-50 w-full'>
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <h5 className='mt-4 text-black dark:text-white font-normal text-[14px] flex items-center gap-1'>
                <BiTime size={18} />
                Free for lifetime
              </h5>
              <div className='flex items-center mt-2'>
                <h1 className='text-[25px] text-black dark:text-white'>FREE</h1>
                {/* <h5 className='text-[20px] ml-2 line-through opacity-80 text-black dark:text-white'>
                  `₹ ${0}`
                </h5> */}
                <h4 className='ml-5 text-[15px] text-black dark:text-slate-800 font-medium bg-yellow-500 dark:bg-amber-100 shadow-lg rounded-full px-2 py-1'>
                  {100}% OFF
                </h4>
              </div>
              <div className='flex items-center'>
                {isPurchased ? (
                  <Link
                    className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer bg-[#37a39a]`}
                    href={`/course-access/${data._id}`}
                  >
                    Enter to Course
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer bg-[#37a39a]`}
                    onClick={handleOrder}
                  >
                    {/* {data.price ? 'Buy Now' : 'Buy Now'}{' '}
                    {data.price ? `${data.price}$` : ''} */}
                    Buy Now
                    {/* {data.price ? `${data.price}$` : ''} */}
                  </div>
                )}
              </div>
              <br />
              <CourseIncludes lesson_count={lessonCount} test_count={0} />
            </div>
          </div>
        </div>
      </div>
      <>
        {open && (
          <div className='w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center'>
            <div className='w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3'>
              <div className='w-full flex justify-end'>
                <IoCloseOutline
                  size={40}
                  className='text-black cursor-pointer'
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className='w-full'>
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckOutForm
                      setOpen={setOpen}
                      data={data}
                      user={user}
                      refetch={refetch}
                    />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;
