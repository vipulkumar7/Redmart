/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { useDocumentTitle } from '../setDocumentTitle'
import { imagePath } from '../../utils/images'
import Footer from './Footer'
import Header from './Header'
import {
    doSignInWithEmailAndPassword,
    doSignInWithGoogle,
} from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";

const Login: React.FC = () => {
    useDocumentTitle('Login');

    const { userLoggedIn } = useAuth()!;
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
    const [errorMessage] = useState<string>('');

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            await doSignInWithEmailAndPassword(email, password);
            // doSendEmailVerification()
        }
    };

    const onGoogleSignIn = (e: any) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            doSignInWithGoogle().catch((e: any) => {
                console.log(e)
                setIsSigningIn(false);
            });
        }
    };

    // if (isAuthenticated) {
    //     navigate('/')
    // }

    return (
        <div id="page-container">
            <Header />
            {userLoggedIn && <Navigate to={"/"} replace={true} />}
            <div className="signup-page" id="content-wrap">
                <div className="container">
                    <div className="row">
                        <div className="col_2">
                            <img
                                className='home_img'
                                src={imagePath.image}
                                alt="image1"
                                width="100%"
                                loading="lazy"
                            />
                        </div>
                        <div className="col_2">
                            <div className="form-container">
                                <div className="form-btn">
                                    <span>Login</span>
                                    <hr id="Indicator" />
                                </div>
                                <form
                                    id="LoginForm"
                                    onSubmit={(e) => {
                                        onSubmit(e)
                                    }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                    {errorMessage && (
                                        <span>{errorMessage}</span>
                                    )}
                                    <button type="submit" className="btn1" disabled={isSigningIn}>
                                        {isSigningIn ? "Signing In..." : "Sign In"}
                                    </button>
                                    <button className="btn1" disabled={isSigningIn}
                                        onClick={(e) => {
                                            onGoogleSignIn(e);
                                        }}>
                                        Login with Google
                                    </button>
                                    {/* <NavLink to="/forgot-password">
                                        Forgot password
                                    </NavLink> */}
                                    <br />
                                    <NavLink to="/signup" style={{ color: '#5f5a5c' }}>
                                        Click here for <span style={{ color: '#11C8B1' }}>
                                            Sign up
                                        </span>
                                    </NavLink>
                                </form>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login
