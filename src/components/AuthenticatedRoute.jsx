import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/hooks';

const AuthenticatedRoute = ({ component: Component }) => {
    const user = useUser();

    return user ? <Component /> : <Navigate to="/login" state={{ message: "This section is only accessible to registered users. Please register or sign in if you already have an account." }} />;
};

AuthenticatedRoute.propTypes = {
    message: PropTypes.string, // Add the 'message' prop validation
    component: PropTypes.elementType.isRequired,
};

export default AuthenticatedRoute;