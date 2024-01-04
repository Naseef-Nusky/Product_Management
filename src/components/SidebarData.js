import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as FcIcons from 'react-icons/fc';



export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    
  },
  {
    title: "Oraganization",
    path: "/organization",
    icon:<AiIcons.AiOutlineTeam />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    
  },
  {
    title: "Employee",
    path: "/employee",
    icon: <RiIcons.RiTeamLine />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Users',
        path: '/overview/users',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Revenue',
        path: '/overview/revenue',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: "Departments",
    path: "/departments",
    icon: <FcIcons.FcDepartment />,

    subNav: [
      {
        title: 'Reports',
        path: '/reports/reports1',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Reports 2',
        path: '/reports/reports2',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Reports 3',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: "Customers",
    path: "/customer",
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Add Customer',
        path: '/messages/message1',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Customer List',
        path: '/messages/message2',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: "Suppliers",
    path: "/supplier",
    icon: <FaIcons.FaShuttleVan />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Add supplier',
        path: '/messages/message1',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Supplier List',
        path: '/messages/message2',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: "Products",
    path: "/products",
    icon: <AiIcons.AiOutlineShoppingCart />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Product List',
        path: '/productList',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Add Product',
        path: '/addProduct',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Category List',
        path: '/categoryList',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Add Category',
        path: '/addCategory',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Brand List',
        path: '/brandList',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Add Brand',
        path: '/addBrand',
        icon: <IoIcons.IoIosPaper />
      },
    ]
  },
  {
    title: "Payments",
    path: "/payment",
    icon: <FaIcons.FaCreditCard/>,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Payment List',
        path: '/paymentList',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Add Payment',
        path: '/addPayment',
        icon: <IoIcons.IoIosPaper />
      },
    ]
    
  },
  {
    title: "Leave",
    path: "/leave",
    icon: <FcIcons.FcLeave/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    
  },
  {
    title: "Feedback",
    path: "/feedback",
    icon: <FcIcons.FcFeedback/>,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    
  },
  {
    title: "Report",
    path: "/report",
    icon: <FaIcons.FaReceipt/>, 

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    
  },
];
