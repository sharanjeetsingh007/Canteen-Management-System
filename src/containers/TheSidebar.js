import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
CCreateElement,
CSidebar,
CSidebarNav,
CSidebarNavDivider,
CSidebarNavTitle,
CSidebarMinimizer,
CSidebarNavDropdown,
CSidebarNavItem,
} from '@coreui/react';

// sidebar nav config
import navigation from './_nav';
import nav_user from './_nav_user';
import { getUser } from 'src/common';

const TheSidebar = () => {
    const dispatch = useDispatch();
    const show = useSelector(state => state.sidebarShow);
    const user = getUser();
    
    if (user.rule === "admin")
    {
        return (
            <CSidebar show={show} 
                        onShowChange={
                            (val) => dispatch(
                                {type: 'set', sidebarShow: val }
                        )}>
                <CSidebarNav>
                    <CCreateElement items={navigation}
                        components={{
                            CSidebarNavDivider,
                            CSidebarNavDropdown,
                            CSidebarNavItem,
                            CSidebarNavTitle
                        }}/>
                </CSidebarNav>
                <CSidebarMinimizer className="c-d-md-down-none"/>
            </CSidebar>
        )
    }
    
    return (
        <CSidebar show={show} 
                onShowChange={
                    (val) => dispatch({type: 'set', sidebarShow: val })}>
            <CSidebarNav>
                <CCreateElement items={nav_user}
                        components={{
                            CSidebarNavDivider,
                            CSidebarNavDropdown,
                            CSidebarNavItem,
                            CSidebarNavTitle
                        }}
                />
            </CSidebarNav>
            <CSidebarMinimizer className="c-d-md-down-none"/>
        </CSidebar>
    )
}

export default React.memo(TheSidebar)
