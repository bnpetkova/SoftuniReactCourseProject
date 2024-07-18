import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state || {}; // Default to an empty object if state is undefined

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSigningIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSigningIn(false);
      navigate('/');
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
    <h2>Login</h2>
    {locationState.message && <p className="error">{locationState.message}</p>}
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="error">{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={signingIn}>
        <FontAwesomeIcon icon={faSignInAlt} />Login</button>
    </form>
  </div>
  );
};

export default Login;
