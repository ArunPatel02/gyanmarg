'use client';

import React from 'react';
import AdminProtected from '../hooks/adminProtected';
import AdminSidebar from '@app/components/Admin/sidebar/AdminSidebar';
import Heading from '@app/utils/Heading';
import Drawer from '../components/Admin/sidebar/Drawer';

interface Props {
  children: React.ReactNode;
}

function layout({ children }: Props) {
  return (
    <AdminProtected>
      <Heading
        title='GyanMarg - Admin'
        description='GyanMarg is a platform for students to learn and get help from teachers'
        keywords='Programming,MERN,Redux,Machine Learning'
      />
      <div className='flex min-h-screen'>
        {/* <div className='1500px:w-[16%] w-1/5'> */}
        <AdminSidebar />
        {/* <Drawer /> */}
        {/* </div> */}
        <div className='w-[100%]'>{children}</div>
      </div>
    </AdminProtected>
  );
}

export default layout;
