'use client';
import './globals.css';
import { Poppins } from 'next/font/google';
import { Josefin_Sans } from 'next/font/google';
import { ThemeProvider } from './utils/theme-provider';
import { Toaster } from 'react-hot-toast';
import { Providers } from './Provider';
import { SessionProvider } from 'next-auth/react';
import React, { FC, useEffect, useState } from 'react';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import Loader from './components/Loader/Loader';
import socketIO from 'socket.io-client';
import { useSelector } from 'react-redux';
import {
  userLoggedIn,
  userRegistration,
} from '@/redux/features/auth/authSlice';
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || '';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-Poppins',
});

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-Josefin',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body
        // className={`${poppins.variable} ${josefin.variable} bg-gradient-to-tr from-neutral-50 to-indigo-50 !bg-neutral-50 bg-no-repeat dark:bg-gradient-to-b dark:from-neutral-800 dark:to-black duration-300`}
        className={`${poppins.variable} ${josefin.variable} bg-neutral-50 dark:bg-[#091020] duration-300`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
              <Custom>
                <div>{children}</div>
              </Custom>
              <Toaster position='top-center' reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom: FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const { status, data } = useLoadUserQuery(undefined);

  useEffect(() => {
    if (status !== 'pending') {
      if (data) {
        console.log(data, 'data');
        userLoggedIn({ accessToken: '', user: data.user });
      }
      setIsLoading(false);
    }
  }, [status]);

  useEffect(() => {
    socketId.on('connection', () => {});
  }, []);

  return <div>{isLoading ? <Loader /> : <div>{children} </div>}</div>;
};
