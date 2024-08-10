/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useDocumentTitle } from '../setDocumentTitle'
import { imagePath } from '../../utils/images'
import { useAuth } from "../../contexts/authContext";
// import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import axiosInstance from '../../axiosInstance'
import API_ENDPOINTS from '../../config/apiconfig'
import { RegisterUserState } from '../Types'

const SignUp: React.FC = () => {
    useDocumentTitle('Sign Up')
    const navigate = useNavigate()
    const [user, setUser] = useState<RegisterUserState>({ fullName: '', email: "", password: "" });
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [errorMessage] = useState<string>("");

    const { userLoggedIn } = useAuth()!;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isRegistering) {
            try {
                setIsRegistering(true);
                const response = await axiosInstance?.post(`${API_ENDPOINTS.createUser}`, user)
                const { data: { data: { _id: userId, fullName }, jwtToken }, status } = response
                if (status === 201) {
                    document.cookie = `authToken=${jwtToken}`;
                    document.cookie = `userId=${userId}`;
                    document.cookie = `fullName=${fullName}`;
                    navigate("/");
                }
            } catch (error) {
                console.log(error, 'error')
            }
        }
    };

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
                                    onSubmit={(e) => { handleSubmit(e) }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={user.fullName}
                                        name='fullName'
                                        required
                                        onChange={handleChange}
                                        disabled={isRegistering}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={user.email}
                                        required
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={user.password}
                                        required
                                        onChange={handleChange}
                                        disabled={isRegistering}
                                        autoComplete="off"
                                    />
                                    {errorMessage && (
                                        <span className="text-red-600 font-bold">{errorMessage}</span>
                                    )}
                                    <button type="submit" className="btn1" disabled={isRegistering}
                                    >
                                        {isRegistering ? "Signing Up..." : "Sign Up"}
                                    </button>
                                    <NavLink to="/login" style={{ color: '#5f5a5c' }}>
                                        Already a member?
                                        <span style={{ color: '#11C8B1' }}>
                                            Sign In
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
