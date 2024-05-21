'use client';
import React, { FC, useEffect, useState } from 'react';
import Heading from './utils/Heading';
import Header from './components/Header';
import Hero from './components/Route/Hero';
import Courses from './components/Route/Courses';
import Reviews from './components/Route/Reviews';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer';
import Script from 'next/script';

interface Props {}

const Page: FC<Props> = (props) => {

  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState('Login');

  return (
    <div>
      <Heading
        title='GyanMarg'
        description='GyanMarg is a platform for students to learn and get help from teachers'
        keywords='Prograaming,MERN,Redux,Machine Learning'
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
      <Courses />
      {/* <Reviews /> */}
      {/* <FAQ /> */}
      <Footer />
      <Script
        strategy='lazyOnload'
        src='https://www.googletagmanager.com/gtag/js?id=G-SRKFG0GY1M'
      />
      <Script id='google-analytics' strategy='lazyOnload'>{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'G-SRKFG0GY1M');`}</Script>
    </div>
  );
};

export default Page;
