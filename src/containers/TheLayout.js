import React from 'react';
import { getUser } from 'src/common'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index';

import { Redirect } from 'react-router-dom';

const TheLayout = () => {
    const user = getUser();
    console.log(user);
    if (!user)
    {
        return (<Redirect to="/login" />);
    }

    return (
        <div className="c-app c-default-layout">
            <TheSidebar/>
            <div className="c-wrapper">
                <TheHeader/>
                <div className="c-body">
                    <TheContent/>
                </div>
                <TheFooter/>
            </div>
        </div>
    )
}

export default TheLayout
