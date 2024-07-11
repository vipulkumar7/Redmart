/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
// import {
//     useDispatch,
//     useSelector 
// } from 'react-redux'
import { NavLink, Navigate } from 'react-router-dom'
// import { signIn } from '../../redux/auth/actions'
import { useDocumentTitle } from '../setDocumentTitle'
import { imagePath } from '../../utils/images'
// import Loader from '../Loader'
import Footer from './Footer'
import Header from './Header'
// import {
//     AuthData, 
//     LoginData
// } from '../Types'
// import { RootState } from '../../redux/rootReducer'
// import { useAuth0 } from "@auth0/auth0-react";
import {
    doSignInWithEmailAndPassword,
    doSignInWithGoogle,
} from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";

const Login: React.FC = () => {
    // const auth: AuthData = useSelector((state: RootState) => state.authReducer)

    // const dispatch = useDispatch()
    // const navigate = useNavigate()
    // const { isAuthenticated, loginWithRedirect } = useAuth0();
    const { userLoggedIn } = useAuth()!;

    useDocumentTitle('Login')

    // const [creds, setCreds] = useState<LoginData>({
    //     email: '',
    //     password: '',
    // })

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
    const [errorMessage] = useState<string>('');

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     dispatch(signIn(creds.email, creds.password))
    //     setCreds({ email: '', password: '' })
    // }

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
                                        // onChange={(e) =>
                                        //     setCreds({
                                        //         ...creds,
                                        //         email: e.target.value,
                                        //     })
                                        // }
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        // onChange={(e) =>
                                        //     setCreds({
                                        //         ...creds,
                                        //         password: e.target.value,
                                        //     })
                                        // }
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
                                    <NavLink to="/signup">
                                        Click here for Sign up
                                    </NavLink>
                                </form>
                                {/* <button
                                    disabled={isSigningIn}
                                    onClick={(e) => {
                                        onGoogleSignIn(e);
                                    }}
                                    className={`w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium  ${isSigningIn
                                        ? "cursor-not-allowed"
                                        : "hover:bg-gray-100 transition duration-300 active:bg-gray-100"
                                        }`}
                                >
                                    <svg
                                        className="w-5 h-5"
                                        viewBox="0 0 48 48"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_17_40)">
                                            <path
                                                d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                                                fill="#FBBC04"
                                            />
                                            <path
                                                d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                                                fill="#EA4335"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_17_40">
                                                <rect width="48" height="48" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    {isSigningIn ? "Signing In..." : "Continue with Google"}
                                </button> */}
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
