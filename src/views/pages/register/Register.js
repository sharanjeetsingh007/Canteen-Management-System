import React, {useState} from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {auth, generateUserDocument, auth_} from "../../../firebase";
import { Redirect } from 'react-router';
import { setUserSession, getUser, validateData } from '../../../common';
import WalletsDataService from '../../../services/wallets.service';

const Register = () => {
    const [signUp, setSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState(null);
    
    const setUpRecaptcha = () => {
        window.recaptchaVerifier = new auth_.RecaptchaVerifier(
            'recaptcha-container', 
            {
                size: 'invisible',
                callback: (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    console.log("Ok: " + response);
                    this.onPhoneNumberSubmit();
                },
            }
        );
    }

    const validation = () => {
        if (displayName === "")
        {
            setError("Please input User Name!");
            return false;
        }        

        if (email === "")
        {
            setError("Please input Email!")
            return false;
        }

        if (phoneNumber === "")
        {
            setError("Please input Phone Number!");
            return false;
        }

        if (password === "")
        {
            setError("Please input Password!");
            return false;
        }

        if (password !== confirm)
        {
            setError("Please confirm the Password!");
            return false;
        }

        setError(null);
        return true;
    }

    const createUserWithEmailAndPasswordHandler = (event, email, password, phoneNumber, displayName) => {
        event.preventDefault();
        setError(null);
        try {
            if (validation() === false)
                return;

            setUpRecaptcha();
            const appVerifier = window.recaptchaVerifier;
            auth.signInWithPhoneNumber(phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    window.confirmationResult = confirmationResult;
                    const code = window.prompt("Enter OTP: ");
                    confirmationResult.confirm(code).then((result) => {
                        // User signed in successfully.
                        const user = result.user;
                        console.log("user: " + user);
                        auth.createUserWithEmailAndPassword(email, password)
                        .then(userAuth => {
                            console.log(userAuth);
                            generateUserDocument(userAuth.user, displayName, phoneNumber)
                            .then(user => {
                                console.log("user: " + user);
                                setUserSession(userAuth.user.refreshToken, user);
                                setSignUp(true);

                                WalletsDataService.create({
                                    uid: user.uid,
                                    username: user.displayName,
                                    total: 100,
                                    payment: "Credit Card"
                                });
                            })
                            .catch(error => {
                                console.log("error 01: " + error);
                                setError(error.message);
                                setSignUp(false);
                            });
                            
                        })
                        .catch(error => {
                            console.log("error 02: " + error);
                            setError(error.message);
                            setSignUp(false);
                        });
                        // ...
                    }).catch((error) => {
                        // User couldn't sign in (bad verification code?)
                        console.log("error 03: " + error);
                        setError(error.message);
                        setSignUp(false);
                    });
                    // ...
                }).catch((error) => {
                    // Error; SMS not sent
                    console.log("error 04: " + error);
                    setError(error.message);
                    setSignUp(false);
                }
            );
            
        }
        catch(error) {
            console.log("error 05: " + error);
            setSignUp(false);
        }

        setEmail("");
        setPassword("");
        setConfirm("");
        setDisplayName("");
        setPhoneNumber("");
        setError(null);
        setSignUp(false);
    };
    
    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "userEmail") {
            const [isValid, error] = validateData('email', value);
            if (!isValid)
            {
                setError(error);
            }
            else
            {
                setError(null);
                setEmail(value);
            }
        } else if (name === "userPassword") {
            setPassword(value);
        } else if (name === "userConfirm") {
            setConfirm(value);
            if (password !== value)
            {
                setError("Please confirm the Password!");
            }
            else
                setError(null);
        } else if (name === "displayName") {
            const [isValid, error] = validateData('name', value);
            if (!isValid)
            {
                setError(error);
            }
            else
            {    
                setError(null);
                setDisplayName(value);
            }
        } else if (name === "phoneNumber") {
            const [isValid, error] = validateData('phone', value);
            if (!isValid)
            {
                setError(error);
            }
            else
            {
                setError(null);
                setPhoneNumber(value);
            }
        }
    };

    if (signUp)
    {
        const user = getUser();
        if (user.rule === "admin")
            return (<Redirect to="/dashboard" />);
        else
            return (<Redirect to="/today-menu" />);
    }

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="9" lg="7" xl="6">
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm>
                                    <h1>Register</h1>
                                    <p className="text-muted">Create your account</p>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>
                                                <CIcon name="cil-user" />
                                            </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput type="text" placeholder="User Name" name="displayName" autoComplete="userName" 
                                                onChange={(e) => {
                                                    onChangeHandler(e);
                                                }}/>
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>@</CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput type="email" placeholder="Email" name="userEmail" autoComplete="email" 
                                                onChange={(e) => {
                                                    onChangeHandler(e);
                                                }} />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>
                                            <CIcon name="cil-phone" />
                                            </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput type="phonenumber" placeholder="+12345678901 for Testing" name="phoneNumber" autoComplete="phoneNumber" 
                                                onChange={(e) => {
                                                    onChangeHandler(e);
                                                }} />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>
                                                <CIcon name="cil-lock-locked" />
                                            </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput type="password" placeholder="Password" name="userPassword" autoComplete="new-password" 
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
                                        <CInput type="password" placeholder="Repeat password" name="userConfirm" autoComplete="new-password" 
                                                onChange={(e) => {
                                                    onChangeHandler(e);
                                                }} />
                                    </CInputGroup>
                                    <CButton color="success" block onClick={(e) => {
                                        createUserWithEmailAndPasswordHandler(e, email, password, phoneNumber, displayName);
                                    }}>Create Account</CButton>
                                </CForm>
                            </CCardBody>
                            {error && error.length > 0 && <>
                                    <CCardFooter className="p-4">
                                        <CRow>
                                            <small style={{color: 'red'}}>{error}</small>
                                        </CRow>
                                    </CCardFooter>
                                </>}
                        </CCard>
                    </CCol>
                </CRow>
                <CRow>
                    <div id='recaptcha-container'></div>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Register
