import React, {useState} from 'react'
import {
  CDropdown,
  CButton,
  CImg
} from '@coreui/react'
import {auth} from "../firebase";
import {Redirect} from 'react-router-dom';

const TheHeaderDropdown = () => {
    const [signout, setSignout] = useState(false);
    if (signout === true)
    {
        return (<Redirect to="/login" />);
    }
    
    return (
        <CDropdown
                inNav
                className="c-header-nav-items mx-2"
                direction="down"
                >
            <CButton className="c-header-nav-link" onClick={()=>{
                auth.signOut();
                setSignout(true);
            }}>
                Logout
            </CButton>
        </CDropdown>
    )
}

export default TheHeaderDropdown
