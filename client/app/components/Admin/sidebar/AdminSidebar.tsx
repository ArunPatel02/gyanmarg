'use client';
import React, { FC, useState } from 'react';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  menuClasses,
  MenuItemStyles,
} from 'react-pro-sidebar';
import { Switch } from './components/Switch';
import { SidebarHeader } from './components/SidebarHeader';
import { Diamond } from './icons/Diamond';
import { BarChart } from './icons/BarChart';
import { Global } from './icons/Global';
import { InkBottle } from './icons/InkBottle';
import { Book } from './icons/Book';
import { Calendar } from './icons/Calendar';
import { ShoppingCart } from './icons/ShoppingCart';
import { Service } from './icons/Service';
// import { SidebarFooter } from './components/SidebarFooter';
import { Badge } from './components/Badge';
import { Typography } from './components/Typography';
import { PackageBadges } from './components/PackageBadges';
import { useTheme } from 'next-themes';
import {
  ArrowBackIosIcon,
  BarChartOutlinedIcon,
  ExitToAppIcon,
  GroupsIcon,
  HomeOutlinedIcon,
  ManageHistoryIcon,
  MapOutlinedIcon,
  OndemandVideoIcon,
  PeopleOutlinedIcon,
  QuizIcon,
  ReceiptOutlinedIcon,
  VideoCallIcon,
  WebIcon,
  WysiwygIcon,
} from './Icon';
import Link from 'next/link';
import { MenuIcon } from 'lucide-react';

type Theme = 'light' | 'dark';

const themes = {
  light: {
    sidebar: {
      backgroundColor: '#ffffff',
      color: '#607489',
    },
    menu: {
      menuContent: '#fbfcfd',
      icon: '#0098e5',
      hover: {
        backgroundColor: '#c5e4ff',
        color: '#44596e',
      },
      disabled: {
        color: '#9fb6cf',
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: '#0b2948',
      color: '#8ba1b7',
    },
    menu: {
      menuContent: '#082440',
      icon: '#59d0ff',
      hover: {
        backgroundColor: '#00458b',
        color: '#b6c8d9',
      },
      disabled: {
        color: '#3e5e7e',
      },
    },
  },
};

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
      component={<Link href={to} />}
    >
      {title}
    </MenuItem>
  );
};

// hex to rgba converter
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const Playground: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(false);
  const [theme, setTheme] = React.useState<Theme>('dark');
  // const { theme, setTheme } = useTheme();
  const [selected, setSelected] = useState('Dashboard');

  // handle on theme change event
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? 'dark' : 'light');
  };

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: '13px',
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(
              themes[theme].menu.menuContent,
              true && !collapsed ? 0.4 : 1
            )
          : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: hexToRgba(
          themes[theme].menu.hover.backgroundColor,
          true ? 0.8 : 1
        ),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        direction: 'ltr',
        zIndex: 100000000000000000,
        position: 'relative',
      }}
    >
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        image='https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg'
        rtl={false}
        breakPoint='md'
        backgroundColor={hexToRgba(
          themes[theme].sidebar.backgroundColor,
          true ? 0.9 : 1
        )}
        rootStyles={{
          color: themes[theme].sidebar.color,
        }}
        style={{
          zIndex: 1000000000000000000,
        }}
      >
        <div
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <div className='flex items-center justify-between'>
            <SidebarHeader
              rtl={false}
              style={{ marginBottom: '24px', marginTop: '16px' }}
            />
          </div>
          <div style={{ flex: 1, marginBottom: '32px' }}>
            <div style={{ padding: '0 24px', marginBottom: '8px' }}>
              <Typography
                variant='body2'
                fontWeight={600}
                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
              >
                General
              </Typography>
            </div>
            <Menu menuItemStyles={menuItemStyles}>
              <Item
                title='Dashboard'
                icon={<HomeOutlinedIcon />}
                to='/admin'
                selected={selected}
                setSelected={setSelected}
              />
            </Menu>
            {/* <Typography
              variant='body2'
              fontWeight={600}
              style={{
                opacity: collapsed ? 0 : 0.7,
                letterSpacing: '0.5px',
                padding: '0 24px',
                marginBottom: '8px',
                marginTop: '20px',
              }}
            >
              Data
            </Typography> */}
            {/* <Menu menuItemStyles={menuItemStyles}>
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
            </Menu> */}

            <Typography
              variant='body2'
              fontWeight={600}
              style={{
                opacity: collapsed ? 0 : 0.7,
                letterSpacing: '0.5px',
                padding: '0 24px',
                marginBottom: '8px',
                marginTop: '20px',
              }}
            >
              {!collapsed && 'Content'}
            </Typography>
            <Menu menuItemStyles={menuItemStyles}>
              <Item
                title='Users'
                to='/admin/users'
                icon={<GroupsIcon />}
                selected={selected}
                setSelected={setSelected}
              />

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
              <Item
                title='Live Repositories'
                to='/admin/repositories'
                icon={<OndemandVideoIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Menu>
            {/* <Typography
              variant='body2'
              fontWeight={600}
              style={{
                opacity: collapsed ? 0 : 0.7,
                letterSpacing: '0.5px',
                padding: '0 24px',
                marginBottom: '8px',
                marginTop: '20px',
              }}
            >
              {!collapsed && 'Repository'}
            </Typography>
            <Menu menuItemStyles={menuItemStyles}>
              <Item
                title='Live Repositories'
                to='/admin/repositories'
                icon={<OndemandVideoIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Menu> */}
            <Typography
              variant='body2'
              fontWeight={600}
              style={{
                opacity: collapsed ? 0 : 0.7,
                letterSpacing: '0.5px',
                padding: '0 24px',
                marginBottom: '8px',
                marginTop: '20px',
              }}
            >
              {!collapsed && 'Customization'}
            </Typography>
            <Menu menuItemStyles={menuItemStyles}>
              {/* <Item
                title='Hero'
                to='/admin/hero'
                icon={<WebIcon />}
                selected={selected}
                setSelected={setSelected}
              /> */}
              {/* <Item
                title='FAQ'
                to='/admin/faq'
                icon={<QuizIcon />}
                selected={selected}
                setSelected={setSelected}
              /> */}
              <Item
                title='Categories'
                to='/admin/categories'
                icon={<WysiwygIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Menu>
            <Typography
              variant='body2'
              fontWeight={600}
              style={{
                opacity: collapsed ? 0 : 0.7,
                letterSpacing: '0.5px',
                padding: '0 24px',
                marginBottom: '8px',
                marginTop: '20px',
              }}
            >
              {!collapsed && 'Controllers'}
            </Typography>
            <Menu menuItemStyles={menuItemStyles}>
              <Item
                title='Manage Team'
                to='/admin/team'
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Menu>
            <Typography
              variant='body2'
              fontWeight={600}
              style={{
                opacity: collapsed ? 0 : 0.7,
                letterSpacing: '0.5px',
                padding: '0 24px',
                marginBottom: '8px',
                marginTop: '20px',
              }}
            >
              {!collapsed && 'Analytics'}
            </Typography>
            <Menu menuItemStyles={menuItemStyles}>
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
            </Menu>
            <Typography
              variant='body2'
              fontWeight={600}
              style={{
                opacity: collapsed ? 0 : 0.7,
                letterSpacing: '0.5px',
                padding: '0 24px',
                marginBottom: '8px',
                marginTop: '20px',
              }}
            >
              {!collapsed && 'Extras'}
            </Typography>
            <Menu menuItemStyles={menuItemStyles}>
              <div
              // onClick={logoutHandler}
              >
                <Item
                  title='Logout'
                  to='/'
                  icon={<ExitToAppIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            </Menu>
            {/* <div
              style={{
                padding: '0 24px',
                marginBottom: '8px',
                marginTop: '32px',
              }}
            >
              <Typography
                variant='body2'
                fontWeight={600}
                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
              >
                Extra
              </Typography>
            </div> */}

            {/* <Menu menuItemStyles={menuItemStyles}>
              <MenuItem
                icon={<Calendar />}
                suffix={<Badge variant='success'>New</Badge>}
              >
                Calendar
              </MenuItem>
              <MenuItem icon={<Book />}>Documentation</MenuItem>
              <MenuItem disabled icon={<Service />}>
                Examples
              </MenuItem>
            </Menu> */}
          </div>
          {/* <SidebarFooter collapsed={collapsed} /> */}
        </div>
      </Sidebar>
      <div
        className='cursor-pointer'
        onClick={() => {
          if (broken) {
            setToggled(!toggled);
          } else setCollapsed(!collapsed);
        }}
        style={{
          marginBottom: 16,
          zIndex: 1000000000,
          position: 'absolute',
          top: '20px',
          right: '-50px',
        }}
      >
        <MenuIcon size={30} className='text-black dark:text-[#ffffffc1]' />
      </div>
    </div>
  );
};

export default Playground;
// 'use client';
// import { FC, useEffect, useState } from 'react';
// import { Sidebar as ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
// import { Box, IconButton, Typography } from '@mui/material';
// // import 'react-pro-sidebar/dist/css/styles.css';
// import {
//   HomeOutlinedIcon,
//   ArrowForwardIosIcon,
//   ArrowBackIosIcon,
//   PeopleOutlinedIcon,
//   ReceiptOutlinedIcon,
//   BarChartOutlinedIcon,
//   MapOutlinedIcon,
//   GroupsIcon,
//   OndemandVideoIcon,
//   VideoCallIcon,
//   WebIcon,
//   QuizIcon,
//   WysiwygIcon,
//   ManageHistoryIcon,
//   SettingsIcon,
//   ExitToAppIcon,
// } from './Icon';
// import avatarDefault from '../../../../public/assests/avatar.png';
// import { useSelector } from 'react-redux';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useTheme } from 'next-themes';

// interface itemProps {
//   title: string;
//   to: string;
//   icon: JSX.Element;
//   selected: string;
//   setSelected: any;
// }

// const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
//   return (
//     <MenuItem
//       active={selected === title}
//       onClick={() => setSelected(title)}
//       icon={icon}
//     >
//       <Typography className='!text-[16px] !font-Poppins text-black dark:text-white'>
//         {title}
//       </Typography>
//       <Link href={to} />
//     </MenuItem>
//   );
// };

// const Sidebar = () => {
//   const { user } = useSelector((state: any) => state.auth);
//   const [logout, setlogout] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [selected, setSelected] = useState('Dashboard');
//   const [mounted, setMounted] = useState(false);
//   const { theme, setTheme } = useTheme();

//   useEffect(() => setMounted(true), []);

//   if (!mounted) {
//     return null;
//   }

//   const logoutHandler = () => {
//     setlogout(true);
//   };

//   return (
//     <Box
//       sx={
//         {
//           // '& .pro-sidebar-inner': {
//           //   background: `${
//           //     theme === 'dark' ? '#111C43 !important' : '#fff !important'
//           //   }`,
//           // },
//           // '& .pro-icon-wrapper': {
//           //   backgroundColor: 'transparent !important',
//           // },
//           // '& .pro-inner-item:hover': {
//           //   color: '#868dfb !important',
//           // },
//           // '& .pro-menu-item.active': {
//           //   color: '#6870fa !important',
//           // },
//           // '& .pro-inner-item': {
//           //   padding: '5px 35px 5px 20px !important',
//           //   opacity: 1,
//           // },
//           // '& .pro-menu-item': {
//           //   color: `${theme !== 'dark' && '#000'}`,
//           // },
//         }
//       }
//       // className='!bg-white dark:bg-[#111C43]'
//     >
//       <ProSidebar
//         collapsed={isCollapsed}
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           height: '100vh',
//           zIndex: 99999999999999,
//           width: isCollapsed ? '0%' : '16%',
//         }}
//       >
//         <Menu
//           iconShape='square'
//           menuItemStyles={{
//             button: {
//               // the active class will be added automatically by react router
//               // so we can use it to style the active menu item
//               [`&.active`]: {
//                 backgroundColor: '#13395e',
//                 color: '#b6c8d9',
//               },
//             },
//           }}
//         >
//           {/* LOGO AND MENU ICON */}
//           <MenuItem
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
//             style={{
//               margin: '10px 0 20px 0',
//             }}
//           >
//             {!isCollapsed && (
//               <Box
//                 display='flex'
//                 justifyContent='space-between'
//                 alignItems='center'
//                 ml='15px'
//               >
//                 <Link href='/' className='block'>
//                   <h3 className='text-[25px] font-Poppins uppercase dark:text-white text-black'>
//                     GyanMarg
//                   </h3>
//                 </Link>
//                 <IconButton
//                   onClick={() => setIsCollapsed(!isCollapsed)}
//                   className='inline-block'
//                 >
//                   <ArrowBackIosIcon className='text-black dark:text-[#ffffffc1]' />
//                 </IconButton>
//               </Box>
//             )}
//           </MenuItem>

//           {!isCollapsed && (
//             <Box mb='25px'>
//               <Box display='flex' justifyContent='center' alignItems='center'>
//                 <Image
//                   alt='profile-user'
//                   width={100}
//                   height={100}
//                   src={user.avatar ? user.avatar.url : avatarDefault}
//                   style={{
//                     cursor: 'pointer',
//                     borderRadius: '50%',
//                     border: '3px solid #5b6fe6',
//                   }}
//                 />
//               </Box>
//               <Box textAlign='center'>
//                 <Typography
//                   variant='h4'
//                   className='!text-[20px] text-black dark:text-[#ffffffc1]'
//                   sx={{ m: '10px 0 0 0' }}
//                 >
//                   {user?.name}
//                 </Typography>
//                 <Typography
//                   variant='h6'
//                   sx={{ m: '10px 0 0 0' }}
//                   className='!text-[20px] text-black dark:text-[#ffffffc1] capitalize'
//                 >
//                   - {user?.role}
//                 </Typography>
//               </Box>
//             </Box>
//           )}

//           <Box paddingLeft={isCollapsed ? undefined : '10%'}>
//             <Item
//               title='Dashboard'
//               to='/admin'
//               icon={<HomeOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />

//             <Typography
//               variant='h5'
//               sx={{ m: '15px 0 5px 25px' }}
//               className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
//             >
//               {!isCollapsed && 'Data'}
//             </Typography>
//             <Item
//               title='Users'
//               to='/admin/users'
//               icon={<GroupsIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />

//             <Item
//               title='Invoices'
//               to='/admin/invoices'
//               icon={<ReceiptOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />

//             <Typography
//               variant='h5'
//               className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
//               sx={{ m: '15px 0 5px 20px' }}
//             >
//               {!isCollapsed && 'Content'}
//             </Typography>
//             <Item
//               title='Create Course'
//               to='/admin/create-course'
//               icon={<VideoCallIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title='Live Courses'
//               to='/admin/courses'
//               icon={<OndemandVideoIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Typography
//               variant='h5'
//               className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
//               sx={{ m: '15px 0 5px 20px' }}
//             >
//               {!isCollapsed && 'Repository'}
//             </Typography>
//             {/* <Item
//               title="Add Repository"
//               to="/admin/create-course"
//               icon={<VideoCallIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             /> */}
//             <Item
//               title='Live Repositories'
//               to='/admin/repositories'
//               icon={<OndemandVideoIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />

//             <Typography
//               variant='h5'
//               className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
//               sx={{ m: '15px 0 5px 20px' }}
//             >
//               {!isCollapsed && 'Customization'}
//             </Typography>
//             <Item
//               title='Hero'
//               to='/admin/hero'
//               icon={<WebIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title='FAQ'
//               to='/admin/faq'
//               icon={<QuizIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title='Categories'
//               to='/admin/categories'
//               icon={<WysiwygIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />

//             <Typography
//               variant='h5'
//               className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
//               sx={{ m: '15px 0 5px 20px' }}
//             >
//               {!isCollapsed && 'Controllers'}
//             </Typography>
//             <Item
//               title='Manage Team'
//               to='/admin/team'
//               icon={<PeopleOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />

//             <Typography
//               variant='h6'
//               className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
//               sx={{ m: '15px 0 5px 20px' }}
//             >
//               {!isCollapsed && 'Analytics'}
//             </Typography>
//             <Item
//               title='Courses Analytics'
//               to='/admin/courses-analytics'
//               icon={<BarChartOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title='Orders Analytics'
//               to='/admin/orders-analytics'
//               icon={<MapOutlinedIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />

//             <Item
//               title='Users Analytics'
//               to='/admin/users-analytics'
//               icon={<ManageHistoryIcon />}
//               selected={selected}
//               setSelected={setSelected}
//             />

//             <Typography
//               variant='h6'
//               className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
//               sx={{ m: '15px 0 5px 20px' }}
//             >
//               {!isCollapsed && 'Extras'}
//             </Typography>
//             <div onClick={logoutHandler}>
//               <Item
//                 title='Logout'
//                 to='/'
//                 icon={<ExitToAppIcon />}
//                 selected={selected}
//                 setSelected={setSelected}
//               />
//             </div>
//           </Box>
//         </Menu>
//       </ProSidebar>
//     </Box>
//   );
// };

// export default Sidebar;
