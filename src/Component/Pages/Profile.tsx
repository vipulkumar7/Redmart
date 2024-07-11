import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { imagePath } from '../../utils/images'
import { useAuth } from "../../contexts/authContext";

const Profile: React.FC = () => {
    const { currentUser } = useAuth()!;
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
                            <h4>Name: {currentUser?.displayName}</h4>
                            <h4>Email: {currentUser?.email}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile
