import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CHeader,
    CToggler,
    CImg,
    CHeaderNav,
} from '@coreui/react';
import { 
    TheHeaderDropdown,
}  from './index';

const TheHeader = () => {
    const dispatch = useDispatch()
    const sidebarShow = useSelector(state => state.sidebarShow)

    const toggleSidebar = () => {
        const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
        dispatch({type: 'set', sidebarShow: val})
    }

    const toggleSidebarMobile = () => {
        const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
        dispatch({type: 'set', sidebarShow: val})
    }

    return (
        <CHeader withSubheader>
            <CToggler
                inHeader
                className="ml-md-3 d-lg-none"
                onClick={toggleSidebarMobile}
                />
            <CToggler
                inHeader
                className="ml-3 d-md-down-none"
                onClick={toggleSidebar}
                />
            
            <CHeaderNav className="d-md-down-none mr-auto">
                <div className="c-avatar">
                    <CImg
                        src={'avatars/logo.png'}
                        className="c-avatar-img"
                        alt="admin@bootstrapmaster.com"
                    />
                </div>
            </CHeaderNav>

            <CHeaderNav className="d-md-down-none mr-auto">
                <div className="c-avatar">
                   <h4>Welcome</h4>
                </div>
            </CHeaderNav>

            <CHeaderNav className="px-3">
                <TheHeaderDropdown/>
            </CHeaderNav>
        </CHeader>
    )
}

export default TheHeader
