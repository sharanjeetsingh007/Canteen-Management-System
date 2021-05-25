import React from 'react';
import componentLoader from './common';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const AllProducts = React.lazy(() => componentLoader(() => import('./views/admin/AllProducts'), 10));
const AddProduct = React.lazy(() => componentLoader(() => import('./views/admin/AddProduct'), 10));
const TodayMenu = React.lazy(() => componentLoader(() => import('./views/admin/TodayMenu'), 10));
const Orders = React.lazy(() => componentLoader(()=> import('./views/admin/Orders'), 10));
const Wallets = React.lazy(() => componentLoader(()=> import('./views/admin/Wallets'), 10));
const UserOrders = React.lazy(() => componentLoader(()=> import('./views/admin/UserOrders'), 10));
const UserWallets = React.lazy(() => componentLoader(()=> import('./views/admin/UserWallets'), 10));
const AboutUs = React.lazy(() => componentLoader(() => import("./views/admin/AboutUs"), 10));
const ContactUs = React.lazy(() => componentLoader(() => import("./views/admin/ContactUs"), 10));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/admin/all-products', exact: true, name: 'All Products', component: AllProducts},
  { path: '/admin/add-product', exact: true, name: 'Add Product', component: AddProduct},
  { path: '/admin/orders', exact: true, name: 'All Orders', component: Orders},
  { path: '/user-orders', exact: true, name: 'User Orders', component: UserOrders},
  { path: '/admin/wallets', exact: true, name: 'All Wallets', component: Wallets},
  { path: '/user-wallets', exact: true, name: 'User Orders', component: UserWallets},
  { path: '/user-about-us', exact: true, name: 'About Us', component: AboutUs},
  { path: '/user-contact-us', exact: true, name: 'Contact Us', component: ContactUs},
  { path: '/today-menu', exact: true, name: "Today's Menu", component: TodayMenu},
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User }
];

export default routes;
