import { useState } from 'react'
import {
    useDispatch,
    // useSelector 
} from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { signIn } from '../../redux/auth/actions'
import { useDocumentTitle } from '../setDocumentTitle'
import { imagePath } from '../../utils/images'
// import Loader from '../Loader'
import Footer from './Footer'
import Header from './Header'
import {
    // AuthData, 
    LoginData
} from '../Types'
// import { RootState } from '../../redux/rootReducer'
import { useAuth0 } from "@auth0/auth0-react";

const Login: React.FC = () => {
    // const auth: AuthData = useSelector((state: RootState) => state.authReducer)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    useDocumentTitle('Login')

    const [creds, setCreds] = useState<LoginData>({
        email: '',
        password: '',
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(signIn(creds.email, creds.password))
        setCreds({ email: '', password: '' })
    }

    if (isAuthenticated) {
        navigate('/')
    }

    return (
        <div id="page-container">
            <Header />
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
                                        handleSubmit(e)
                                    }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Enter Email"
                                        value={creds.email}
                                        onChange={(e) =>
                                            setCreds({
                                                ...creds,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={creds.password}
                                        onChange={(e) =>
                                            setCreds({
                                                ...creds,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                    <button type="submit" className="btn1">
                                        Login
                                    </button>
                                    <button type="submit" className="btn1" onClick={() => loginWithRedirect()}>
                                        Login with Google
                                    </button>
                                    <NavLink to="/forgot-password">
                                        Forgot password
                                    </NavLink>
                                    <br />
                                    <NavLink to="/signup">
                                        Click here for Sign up
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
