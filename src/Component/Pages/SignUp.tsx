/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useDocumentTitle } from '../setDocumentTitle'
import { imagePath } from '../../utils/images'
import { useAuth } from "../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";

const SignUp: React.FC = () => {
    useDocumentTitle('Sign Up')

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setconfirmPassword] = useState<string>("");
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [errorMessage] = useState<string>("");

    const { userLoggedIn } = useAuth()!;

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            await doCreateUserWithEmailAndPassword(email, password);
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
                                src={imagePath.image}
                                alt="image-1"
                                width="100%"
                                loading="lazy"
                            />
                        </div>
                        <div className="col_2">
                            <div className="form-container">
                                <div className="form-btn">
                                    <span>Register</span>
                                    <hr id="Indicator" />
                                </div>
                                <form
                                    id="RegForm"
                                    onSubmit={onSubmit}
                                >
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        required
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        required
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        disabled={isRegistering}
                                    />

                                    <input
                                        type="password"
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        required
                                        onChange={(e) => {
                                            setconfirmPassword(e.target.value);
                                        }}
                                        disabled={isRegistering}
                                    />
                                    {errorMessage && (
                                        <span className="text-red-600 font-bold">{errorMessage}</span>
                                    )}
                                    <button type="submit" className="btn1" disabled={isRegistering}
                                    >
                                        {isRegistering ? "Signing Up..." : "Sign Up"}
                                    </button>
                                    <NavLink to="/login">
                                        Already a member?{' '}
                                        <span style={{ color: '#11C8B1' }}>
                                            {' '}
                                            Sign In{' '}
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

export default SignUp
