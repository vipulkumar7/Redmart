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
    doSignInWithGithub
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

    const onGithubSignIn = (e: any) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            doSignInWithGithub().catch((e: any) => {
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
                                    <span>
                                        <button
                                            className='oAuthSignIn'
                                            disabled={isSigningIn}
                                            onClick={(e) => {
                                                onGoogleSignIn(e);
                                            }}
                                        >
                                            <svg style={{ width: '50px', height: '50px', background: '#FFFFFF' }} enable-background="new 0 0 24 24" id="Layer_1" version="1.1" viewBox="0 0 24 24" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g><path d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707   C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321   C6.4099731,6.9193726,8.977478,5,12,5z" fill="#F44336" /><path d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12   c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458   l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z" fill="#2196F3" /><path d="M5,12c0-0.8434448,0.1568604-1.6483765,0.4302368-2.3972168L1.3858032,6.4098511   C0.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534,0.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215   C5.1484375,13.6044312,5,12.8204346,5,12z" fill="#FFC107" /><path d="M12,19c-3.0455322,0-5.6295776-1.9484863-6.5922241-4.6640625L1.3582153,17.532959   C3.3592529,21.3734741,7.369812,24,12,24c3.027771,0,5.7887573-1.1248169,7.8974609-2.975708l-4.0594482-3.204834   C14.7412109,18.5588989,13.4284058,19,12,19z" fill="#00B060" /><path d="M12,23.75c-3.5316772,0-6.7072754-1.4571533-8.9524536-3.7786865C5.2453613,22.4378052,8.4364624,24,12,24   c3.5305786,0,6.6952515-1.5313721,8.8881226-3.9592285C18.6495972,22.324646,15.4981079,23.75,12,23.75z" opacity="0.1" /><polygon opacity="0.1" points="12,14.25 12,14.5 18.4862061,14.5 18.587492,14.25  " /><path d="M23.9944458,12.1470337C23.9952393,12.0977783,24,12.0493774,24,12   c0-0.0139771-0.0021973-0.0274658-0.0022583-0.0414429C23.9970703,12.0215454,23.9938965,12.0838013,23.9944458,12.1470337z" fill="#E6E6E6" /><path d="M12,9.5v0.25h11.7855721c-0.0157471-0.0825195-0.0329475-0.1680908-0.0503426-0.25H12z" fill="#FFFFFF" opacity="0.2" /><linearGradient gradientUnits="userSpaceOnUse" id="SVGID_1_" x1="0" x2="24" y1="12" y2="12"><stop offset="0" style={{ stopColor: '#FFFFFF', stopOpacity: '0.2' }} /><stop offset="1" style={{ stopColor: '#FFFFFF', stopOpacity: '0' }} /></linearGradient><path d="M23.7352295,9.5H12v5h6.4862061C17.4775391,17.121582,14.9771729,19,12,19   c-3.8659668,0-7-3.1340332-7-7c0-3.8660278,3.1340332-7,7-7c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686   c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374l3.637146-3.4699707L19.8414307,2.940979   C17.7369385,1.1170654,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12c0,6.6273804,5.3725586,12,12,12   c6.1176758,0,11.1554565-4.5812378,11.8960571-10.4981689C23.9585571,13.0101929,24,12.508667,24,12   C24,11.1421509,23.906311,10.3068237,23.7352295,9.5z" fill="url(#SVGID_1_)" /><path d="M15.7885132,5.890686C14.6939087,5.1806641,13.4018555,4.75,12,4.75c-3.8659668,0-7,3.1339722-7,7   c0,0.0421753,0.0005674,0.0751343,0.0012999,0.1171875C5.0687437,8.0595093,8.1762085,5,12,5   c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374   l3.637146-3.4699707l-3.637146,3.2199707C16.1289062,6.1018066,15.9560547,5.9995728,15.7885132,5.890686z" opacity="0.1" /><path d="M12,0.25c2.9750366,0,5.6829224,1.0983887,7.7792969,2.8916016l0.144165-0.1375122   l-0.110014-0.0958166C17.7089558,1.0843592,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12   c0,0.0421753,0.0058594,0.0828857,0.0062866,0.125C0.0740356,5.5558472,5.4147339,0.25,12,0.25z" fill="#FFFFFF" opacity="0.2" /></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg>
                                        </button>
                                    </span>
                                    <span>
                                        <button
                                            className='oAuthSignIn'
                                            disabled={isSigningIn}
                                            onClick={(e) => {
                                                onGithubSignIn(e);
                                            }}
                                        >
                                            <svg style={{ width: '50px', height: '50px', background: '#FFFFFF' }} enable-background="new 0 0 512 512" height="512px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="512px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g><path clip-rule="evenodd" d="M296.133,354.174c49.885-5.891,102.942-24.029,102.942-110.192   c0-24.49-8.624-44.448-22.67-59.869c2.266-5.89,9.515-28.114-2.734-58.947c0,0-18.139-5.898-60.759,22.669   c-18.139-4.983-38.09-8.163-56.682-8.163c-19.053,0-39.011,3.18-56.697,8.163c-43.082-28.567-61.22-22.669-61.22-22.669   c-12.241,30.833-4.983,53.057-2.718,58.947c-14.061,15.42-22.677,35.379-22.677,59.869c0,86.163,53.057,104.301,102.942,110.192   c-6.344,5.452-12.241,15.873-14.507,30.387c-12.702,5.438-45.808,15.873-65.758-18.592c0,0-11.795-21.31-34.012-22.669   c0,0-22.224-0.453-1.813,13.592c0,0,14.96,6.812,24.943,32.653c0,0,13.6,43.089,76.179,29.48v38.543   c0,5.906-4.53,12.702-15.865,10.89C96.139,438.977,32.2,354.626,32.2,255.77c0-123.807,100.216-224.022,224.03-224.022   c123.347,0,224.023,100.216,223.57,224.022c0,98.856-63.946,182.754-152.828,212.688c-11.342,2.266-15.873-4.53-15.873-10.89   V395.45C311.1,374.577,304.288,360.985,296.133,354.174L296.133,354.174z M512,256.23C512,114.73,397.263,0,256.23,0   C114.73,0,0,114.73,0,256.23C0,397.263,114.73,512,256.23,512C397.263,512,512,397.263,512,256.23L512,256.23z" fill="#0D2636" fill-rule="evenodd" /></g></svg>
                                        </button>
                                    </span>
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
