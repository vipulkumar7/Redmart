// import { useSelector } from 'react-redux'
import { Route, RouteProps, useNavigate } from 'react-router-dom'
// import { AuthData } from '../Component/Types'
// import { RootState } from '../redux/rootReducer'
import { useAuth0 } from '@auth0/auth0-react'

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...rest }: any) => {

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();
    // const auth: AuthData = useSelector((state: RootState) => state.authReducer);
    return (
        <Route {...rest} render={(props: any) => (
            isAuthenticated ?
                <Component {...props} />
                : navigate('/login')
        )} />
    );
};

export default PrivateRoute;
