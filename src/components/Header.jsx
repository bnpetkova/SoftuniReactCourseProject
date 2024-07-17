import { Link } from 'react-router-dom';
import { useUser } from '../contexts/hooks';
import { auth } from '../firebaseConfig';
import { signOut } from '@firebase/auth';

function Header() {
  const currentUser = useUser();

  const handleLogout = (e) => {
    debugger;
    e.preventDefault();

    signOut(auth)
      .then(() => { console.log('Sign out successfully') })
      .catch((error) => { console.error('Error signing out:', error); });
  };

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">Products</Link>
          </li>
          <li className="nav-item">
            {currentUser && <Link to="#" className="nav-link" onClick={handleLogout}>Logout</Link>}
            {!currentUser && <Link to="/login" className="nav-link">Login</Link>}
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
          <li className="nav-item">
            <Link to="/wishlist" className="nav-link">Wishlist</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

