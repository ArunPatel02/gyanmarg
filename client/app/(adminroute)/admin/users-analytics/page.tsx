'use client';
import React from 'react';
import AdminSidebar from '@app/components/Admin/sidebar/AdminSidebar';
import Heading from '@app/utils/Heading';
import DashboardHeader from '@app/components/Admin/DashboardHeader';
import UserAnalytics from '@app/components/Admin/Analytics/UserAnalytics';

type Props = {};

const page = (props: Props) => {
  return (
    // <div>
    //     <Heading
    //      title="GyanMarg - Admin"
    //      description="GyanMarg is a platform for students to learn and get help from teachers"
    //      keywords="Prograaming,MERN,Redux,Machine Learning"
    //     />
    //     <div className="flex">
    //         <div className="1500px:w-[16%] w-1/5">
    //             <AdminSidebar />
    //         </div>
    //         <div className="w-[85%]">
    //            <DashboardHeader />
    <UserAnalytics />
    //         </div>
    //     </div>
    // </div>
  );
};

export default page;