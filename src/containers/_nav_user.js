const _nav_user =  [
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

export default _nav_user;
