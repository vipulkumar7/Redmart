import { useSelector } from 'react-redux'
import { Route, RouteProps, useNavigate } from 'react-router-dom'
import { AuthData } from '../Component/Types'
import { RootState } from '../redux/rootReducer'

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...rest }: any) => {

    const navigate = useNavigate();
    const auth: AuthData = useSelector((state: RootState) => state.authReducer);
    return (
        <Route {...rest} render={(props: any) => (
            auth.token ?
                <Component {...props} />
                : navigate('/login')
        )} />
    );
};

export default PrivateRoute;
