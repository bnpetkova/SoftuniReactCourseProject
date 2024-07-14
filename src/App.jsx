// import { useState } from 'react'
import './App.css'
// import app from './firebaseConfig'
// import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import ProductsList from './ProductsList';
// const auth = getAuth(app);

function App() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [user, setUser] = useState(null);

  // const handleLogin = async () => {
  //   try {
  //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //     setUser(userCredential.user);
  //   } catch (error) {
  //     console.error("Error signing in:", error);
  //   }
  // };

  // const handleLogout = async () => {
  //   await signOut(auth);
  //   setUser(null);
  // };

  return (
    <div>
      <h1>Firebase Auth with Vite and React</h1>
      <ProductsList />
      {/* {user ? (<div>
        <p>Welcome, {user.email}</p>
        <button onClick={handleLogout}>Logout</button>


      </div>) : (<div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
      </div>)}*/}
    </div>)
}

export default App
