import React, { FC, ReactNode, useEffect, useState } from 'react';
import UserAnalytics from '../Analytics/UserAnalytics';
import { BiBorderLeft } from 'react-icons/bi';
import { PiUsersFourLight } from 'react-icons/pi';
import { Box, CircularProgress } from '@mui/material';
import OrdersAnalytics from '../Analytics/OrdersAnalytics';
import AllInvoices from '../Order/AllInvoices';
import {
  useGetDashboardInfoQuery,
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from '@/redux/features/analytics/analyticsApi';

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant='determinate'
        value={value}
        size={45}
        color={value && value > 99 ? 'info' : 'error'}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
  const [userComparePercentage, setuserComparePercentage] = useState<any>();

  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: dashboardInfo } = useGetDashboardInfoQuery({});
  console.log(dashboardInfo, 'dashboard info');
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    if (isLoading && ordersLoading) {
      return;
    } else {
      if (data && ordersData) {
        const usersLastTwoMonths = data.users.last12Months.slice(-2);
        const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);

        if (
          usersLastTwoMonths.length === 2 &&
          ordersLastTwoMonths.length === 2
        ) {
          const usersCurrentMonth = usersLastTwoMonths[1].count;
          const usersPreviousMonth = usersLastTwoMonths[0].count;
          const ordersCurrentMonth = ordersLastTwoMonths[1].count;
          const ordersPreviousMonth = ordersLastTwoMonths[0].count;

          const usersPercentChange =
            usersPreviousMonth !== 0
              ? ((usersCurrentMonth - usersPreviousMonth) /
                  usersPreviousMonth) *
                100
              : 100;

          const ordersPercentChange =
            ordersPreviousMonth !== 0
              ? ((ordersCurrentMonth - ordersPreviousMonth) /
                  ordersPreviousMonth) *
                100
              : 100;

          setuserComparePercentage({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentChange: usersPercentChange,
          });

          setOrdersComparePercentage({
            currentMonth: ordersCurrentMonth,
            previousMonth: ordersPreviousMonth,
            percentChange: ordersPercentChange,
          });
        }
      }
    }
  }, [isLoading, ordersLoading, data, ordersData]);

  return (
    <div className='mt-[30px] min-h-screen'>
      <div className='px-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 mt-28'>
        <WidgetCard
          title='Live courses'
          icon={
            <BiBorderLeft className='dark:text-[#45CBA0] text-[#000] text-[30px]' />
          }
          count={dashboardInfo?.total_course_count}
        />
        <WidgetCard
          title='Today Sales Obtained'
          icon={
            <BiBorderLeft className='dark:text-[#45CBA0] text-[#000] text-[30px]' />
          }
          count={dashboardInfo?.today_sale_count}
          // percentage={ordersComparePercentage?.percentChange?.toFixed(2)}
        />
        <div className='lg:col-span-2 xl:col-span-1'>
          <WidgetCard
            title='Total Users'
            icon={
              <PiUsersFourLight className='dark:text-[#45CBA0] text-[#000] text-[30px]' />
            }
            count={dashboardInfo?.total_user_count}
            // percentage={userComparePercentage?.percentChange?.toFixed(2)}
          />
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 px-8'>
        <div className='mt-10'>
          <UserAnalytics isDashboard={true} />
        </div>
        <div className='mt-10'>
          <OrdersAnalytics isDashboard={true} />
        </div>
      </div>

      <div className='grid grid-cols-[100%] max-w-[800px] lg:px-8'>
        <div className='p-5'>
          <h5 className='dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins pb-3'>
            Recent Transactions
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

interface WidgetCardProps {
  title: string;
  count: number;
  percentage?: number;
  icon: ReactNode;
}

const WidgetCard = ({
  title = 'Title',
  count,
  percentage,
  icon,
}: WidgetCardProps) => {
  return (
    <div className='w-full dark:bg-[#111C43] self-start rounded-lg dark:shadow-xl shadow-lg border'>
      <div className='flex items-center p-5 justify-between'>
        <div className=''>
          {icon}
          <h5 className='pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]'>
            {count}
          </h5>
          <h5 className='py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]'>
            {title}
          </h5>
        </div>
        <div>
          {percentage && (
            <>
              <CircularProgressWithLabel
                value={percentage > 0 ? 100 : 0}
                open={Boolean(open)}
              />
              <h5 className='text-center pt-4'>
                {percentage > 0 ? '+' + percentage : '-' + percentage} %
              </h5>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default DashboardWidgets;
