import React from 'react'
// import { useSelector } from 'react-redux'
import Header from './Header'
import Footer from './Footer'
// import { AuthData } from '../Types'
// import { RootState } from '../../redux/rootReducer'
import { imagePath } from '../../utils/images'
import { useAuth0 } from '@auth0/auth0-react'

const Profile: React.FC = () => {
    // const auth: AuthData = useSelector((state: RootState) => state.authReducer)
    const { user } = useAuth0();

    return (
        <div id="page-container">
            <Header />
            <div id="content-wrap">
                <div className="small-container">
                    <img
                        src={imagePath.personal_info}
                        alt="Personal_information"
                        height="350px"
                        width="100%"
                        loading="lazy"
                    />
                    <div className="row row-2">
                        <div>
                            <h2>Personal Information</h2>
                            <h4>Name: {user?.name}</h4>
                            <h4>Email: {user?.email}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile
