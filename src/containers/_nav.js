import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
    {
        _tag: 'CSidebarNavTitle',
        _children: ['Admin']
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'All Products',
        to: '/admin/all-products',
        icon: 'cil-puzzle',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Add Product',
        to: '/admin/add-product',
        icon: 'cil-pencil',
    },
    {
        _tag: 'CSidebarNavItem',
        name: "Today's Menu",
        to: '/today-menu',
        icon: 'cil-menu',
    },
    {
        _tag: 'CSidebarNavItem',
        name: "Wallets",
        to: '/admin/wallets',
        icon: 'cil-wallet',
    },
    {
        _tag: 'CSidebarNavItem',
        name: "Orders",
        to: '/admin/orders',
        icon: 'cil-cart',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Users',
        to: '/users',
        icon: 'cil-user',
    },
    {
        _tag: 'CSidebarNavTitle',
        _children: ['User']
    },
    {
        _tag: 'CSidebarNavItem',
        name: "Today's Menu",
        to: '/today-menu',
        icon: 'cil-menu',
    },
    {
        _tag: 'CSidebarNavItem',
        name: "My Orders",
        to: '/user-orders',
        icon: 'cil-cart',
    },
    {
        _tag: 'CSidebarNavItem',
        name: "My Wallets",
        to: '/user-wallets',
        icon: 'cil-wallet',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Contact Us',
        to: '/user-contact-us',
        icon: 'cil-puzzle',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'About Us',
        to: '/user-about-us',
        icon: 'cil-pencil',
    },
];

export default _nav;
