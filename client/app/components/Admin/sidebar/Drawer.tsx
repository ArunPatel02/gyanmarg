import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FC, useEffect, useState } from 'react';
import { Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography } from '@mui/material';
import 'react-pro-sidebar/dist/css/styles.css';
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  SettingsIcon,
  ExitToAppIcon,
} from './Icon';
import avatarDefault from '../../../../public/assests/avatar.png';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className='!text-[16px] !font-Poppins'>{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

function Drawer() {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setlogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const logoutHandler = () => {
    setlogout(true);
  };

  return (
    <Sheet>
      <SheetTrigger asChild className='z-50'>
        <Button variant='outline'>Open</Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Menu>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
            }}
          >
            {true && (
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                ml='15px'
              >
                <Link href='/' className='block'>
                  <h3 className='text-[25px] font-Poppins uppercase dark:text-white text-black'>
                    GyanMarg
                  </h3>
                </Link>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className='inline-block'
                >
                  <ArrowBackIosIcon className='text-black dark:text-[#ffffffc1]' />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {true && (
            <Box mb='25px'>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <Image
                  alt='profile-user'
                  width={100}
                  height={100}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '50%',
                    border: '3px solid #5b6fe6',
                  }}
                />
              </Box>
              <Box textAlign='center'>
                <Typography
                  variant='h4'
                  className='!text-[20px] text-black dark:text-[#ffffffc1]'
                  sx={{ m: '10px 0 0 0' }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant='h6'
                  sx={{ m: '10px 0 0 0' }}
                  className='!text-[20px] text-black dark:text-[#ffffffc1] capitalize'
                >
                  - {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={true ? undefined : '10%'}>
            <Item
              title='Dashboard'
              to='/admin'
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              sx={{ m: '15px 0 5px 25px' }}
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
              {!isCollapsed && 'Data'}
            </Typography>
            <Item
              title='Users'
              to='/admin/users'
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title='Invoices'
              to='/admin/invoices'
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
              sx={{ m: '15px 0 5px 20px' }}
            >
              {!isCollapsed && 'Content'}
            </Typography>
            <Item
              title='Create Course'
              to='/admin/create-course'
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Live Courses'
              to='/admin/courses'
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant='h5'
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
              sx={{ m: '15px 0 5px 20px' }}
            >
              {!isCollapsed && 'Repository'}
            </Typography>
            {/* <Item
              title="Add Repository"
              to="/admin/create-course"
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title='Live Repositories'
              to='/admin/repositories'
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
              sx={{ m: '15px 0 5px 20px' }}
            >
              {!isCollapsed && 'Customization'}
            </Typography>
            <Item
              title='Hero'
              to='/admin/hero'
              icon={<WebIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='FAQ'
              to='/admin/faq'
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Categories'
              to='/admin/categories'
              icon={<WysiwygIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
              sx={{ m: '15px 0 5px 20px' }}
            >
              {!isCollapsed && 'Controllers'}
            </Typography>
            <Item
              title='Manage Team'
              to='/admin/team'
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h6'
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
              sx={{ m: '15px 0 5px 20px' }}
            >
              {!isCollapsed && 'Analytics'}
            </Typography>
            <Item
              title='Courses Analytics'
              to='/admin/courses-analytics'
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Orders Analytics'
              to='/admin/orders-analytics'
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title='Users Analytics'
              to='/admin/users-analytics'
              icon={<ManageHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h6'
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
              sx={{ m: '15px 0 5px 20px' }}
            >
              {!isCollapsed && 'Extras'}
            </Typography>
            <div onClick={logoutHandler}>
              <Item
                title='Logout'
                to='/'
                icon={<ExitToAppIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </Box>
        </Menu>

        <SheetFooter>
          <SheetClose asChild>
            <Button type='submit'>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Drawer;
