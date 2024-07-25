import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext'; // Adjust the path as necessary

const AuthenticatedRoute = ({ component: Component }) => {
    const { user } = useContext(UserContext);

    return user ? <Component /> : <Navigate to="/login" state={{ message: "Please sign in to access this page." }} />;
};

AuthenticatedRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
};

export default AuthenticatedRoute;
