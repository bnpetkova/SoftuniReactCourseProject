import { Link } from "react-router-dom";
import { useUser } from "../contexts/hooks";
import { auth } from "../firebaseConfig";
import { signOut } from "@firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSignInAlt,
  faBars,
  faHeart,
  faUserPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar } from "flowbite-react";

function Header() {
  const currentUser = useUser();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await signOut(auth);
      console.log("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Navbar className="border-b-2">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <Navbar.Collapse>
          <Navbar.Link>
            <Link to="/" className="nav-link">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
          </Navbar.Link>

          <Navbar.Link>
            <Link to="/products" className="nav-link">
              <FontAwesomeIcon icon={faBars} />
              Products
            </Link>
          </Navbar.Link>

          {currentUser && (
            <Navbar.Link>
              <Link to="/myprofile" className="nav-link">
                <FontAwesomeIcon icon={faUser} />
                My Profile
              </Link>
            </Navbar.Link>
          )}

          <Navbar.Link>
            {currentUser ? (
              <Link to="#" className="nav-link" onClick={handleLogout}>
                Logout
              </Link>
            ) : (
              <Link to="/login" className="nav-link">
                <FontAwesomeIcon icon={faSignInAlt} />
                Login
              </Link>
            )}
          </Navbar.Link>

          <Navbar.Link>
            <Link to="/register" className="nav-link">
              <FontAwesomeIcon icon={faUserPlus} /> Register
            </Link>
          </Navbar.Link>

          <Navbar.Link>
            <Link to="/wishlist" className="nav-link">
              <FontAwesomeIcon icon={faHeart} />
              Wishlist
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </nav>
    </Navbar>
  );
}

export default Header;
