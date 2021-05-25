import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCardFooter,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow
} from '@coreui/react';

import {Redirect} from 'react-router-dom';

import CIcon from '@coreui/icons-react';
import { auth, getUserDocument } from "../../../firebase";
import { setUserSession, getUser } from '../../../common';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const signInWithEmailAndPasswordHandler = (event,email, password) => {
        event.preventDefault();
        setError(null);
        setAuthenticated(false);
        auth.signInWithEmailAndPassword(email, password)
        .then((userAuth) => {
            getUserDocument(userAuth.user.uid)
            .then(data => {
                setUserSession(userAuth.user.refreshToken, data);
                setAuthenticated(true);
            })
            .catch(error => {
                setAuthenticated(false);    
                setError(error.message);
            });
            
        })
        .catch(error => { 
            setAuthenticated(false);
            setError(error.message);
        });
    };

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;

        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
            setPassword(value);
        }
    };

    if (authenticated)
    {
        const user = getUser();
        console.log(user);
        if (user.rule !== "admin")
            return (<Redirect to="/today-menu" />);
        else
            return (<Redirect to="/" />);
    }
  
    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="8">
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm>
                                        <h1>Login</h1>
                                        <p className="text-muted">Sign In to your account</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-user" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="email" placeholder="User Email" name='userEmail' autoComplete="userEmail" 
                                                        onChange={(e) => {
                                                            onChangeHandler(e);
                                                        }} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-lock-locked" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="password" placeholder="Password" name='userPassword' autoComplete="userPassword" 
                                                        onChange={(e) => {
                                                            onChangeHandler(e);
                                                        }} />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs="6">
                                                <CButton color="primary" className="px-4" onClick={(e) => {
                                                    signInWithEmailAndPasswordHandler(e, email, password);
                                                }}>Login</CButton>
                                            </CCol>
                                            <CCol xs="6" className="text-right">
                                                <CButton color="link" className="px-0">Forgot password?</CButton>
                                            </CCol>
                                        </CRow>
                                        {error && <>
                                            <CRow>
                                                <small style={{color: 'red'}}>{error}</small>
                                            </CRow>
                                        </>}
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>Sign up</h2>
                                        <p>Please sing up if you have not an account.</p>
                                        <Link to="/register">
                                            <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                                        </Link>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
