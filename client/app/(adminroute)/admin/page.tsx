'use client';
import React from 'react';
import Heading from '@app/utils/Heading';
import AdminSidebar from '@app/components/Admin/sidebar/AdminSidebar';
import AdminProtected from '@app/hooks/adminProtected';
import DashboardHero from '@app/components/Admin/DashboardHero';

type Props = {};

const page = (props: Props) => {
  return (
    // <div>
    //     <Heading
    //       title="GyanMarg - Admin"
    //       description="GyanMarg is a platform for students to learn and get help from teachers"
    //       keywords="Programming,MERN,Redux,Machine Learning"
    //     />
    //     <div className="flex min-h-screen">
    //       <div className="1500px:w-[16%] w-1/5">
    //         <AdminSidebar />
    //       </div>
    //       <div className="w-[85%]">
    <DashboardHero isDashboard={true} />
    //       </div>
    //     </div>
    // </div>
  );
};

export default page;
