import { Link } from 'react-router-dom';
import { useUser } from '../contexts/hooks';
import { auth } from '../firebaseConfig';
import { signOut } from '@firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faBars, faEnvelope, faHeart,faUserPlus } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const currentUser = useUser();

  const handleLogout = (e) => {
    
    e.preventDefault();

    signOut(auth)
      .then(() => { console.log('Sign out successfully') })
      .catch((error) => { console.error('Error signing out:', error); });
  };

  return (
    <header className="header-custom">
      <nav className="container">
        <ul className="nav-custom">
          <li className="nav-item">
            <Link to="/" className="nav-link">
            <FontAwesomeIcon icon={faHome} /> Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">
            <FontAwesomeIcon icon={faBars} />Products</Link>
          </li>
          <li className="nav-item">
            {currentUser && <Link to="#" className="nav-link" onClick={handleLogout}>Logout</Link>}
            {!currentUser && <Link to="/login" className="nav-link">
              <FontAwesomeIcon icon={faSignInAlt} />Login</Link>}
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">
            <FontAwesomeIcon icon={faUserPlus} /> Register</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
            <FontAwesomeIcon icon={faEnvelope} /> Contact</Link>
          </li>
          <li className="nav-item">
            <Link to="/wishlist" className="nav-link">
            <FontAwesomeIcon icon={faHeart} />Wishlist</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

