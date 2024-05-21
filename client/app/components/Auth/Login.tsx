'use client';
import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { styles } from '../../../app/styles/style';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Button from '../atoms/buttons/Button';

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch: any;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email!')
    .required('Please enter your email!'),
  password: Yup.string().required('Please enter your password!').min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen, refetch }) => {
  console.log('login component');
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('Login Successfully!');
      setOpen(false);
      refetch();
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className='w-full'>
      <Link
        title='path of knowledge'
        href={'/'}
        className={`flex items-end justify-center text-[18px] font-Poppins font-[500] text-black dark:text-white`}
      >
        Gyan
        <span className='text-gradient text-[15px] font-[400]'>Marg</span>
      </Link>
      <h1 className={`${styles.title} mb-4`}>Sign In To Your Account</h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label}`} htmlFor='email'>
          Enter your Email
        </label>
        <input
          type='email'
          name=''
          value={values.email}
          onChange={handleChange}
          id='email'
          placeholder='loginmail@gmail.com'
          className={`${errors.email && touched.email && 'border-red-500'} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <span className='text-red-500 pt-2 block'>{errors.email}</span>
        )}
        <div className='w-full mt-5 relative mb-1'>
          <label className={`${styles.label}`} htmlFor='email'>
            Enter your password
          </label>
          <input
            type={!show ? 'password' : 'text'}
            name='password'
            value={values.password}
            onChange={handleChange}
            id='password'
            placeholder='password!@%'
            className={`${
              errors.password && touched.password && 'border-red-500'
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className='absolute bottom-3 right-2 z-1 cursor-pointer'
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className='absolute bottom-3 right-2 z-1 cursor-pointer'
              size={20}
              onClick={() => setShow(false)}
            />
          )}
          {errors.password && touched.password && (
            <span className='text-red-500 pt-2 block'>{errors.password}</span>
          )}
        </div>
        <div className='w-full mt-5 flex justify-center'>
          {/* <input
            type='submit'
            value='LOGIN'
            className={`${styles.button} bg-gradient-to-bl from-[#3e7fd9] to-[#5c3bd6]`}
          /> */}
          <Button className='mx-auto w-[100%] mt-2' type='submit' variant='primary'>
            Log in
          </Button>
        </div>
        <br />
        {process.env.ENABLE_GITHUB_LOGIN && process.env.ENABLE_GITHUB_LOGIN && (
          <>
            <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
              Or join with
            </h5>
            <div className='flex items-center justify-center my-3'>
              {process.env.ENABLE_GOOGLE_LOGIN && (
                <FcGoogle
                  size={30}
                  className='cursor-pointer mr-2'
                  onClick={() => {
                    signIn('google');
                  }}
                />
              )}
              {process.env.ENABLE_GITHUB_LOGIN && (
                <AiFillGithub
                  size={30}
                  className='cursor-pointer ml-2'
                  onClick={() => {
                    signIn('github');
                  }}
                />
              )}
            </div>
          </>
        )}
        <h5 className='text-center pt-2 font-Poppins text-[14px] text-black dark:text-white'>
          Not have any account?{' '}
          <span
            className='text-[#2190ff] pl-1 cursor-pointer'
            onClick={() => setRoute('Sign-Up')}
          >
            Sign up
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Login;
