import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase Auth function
import { auth } from '../firebase'; // Import Firebase auth
import { db } from '../firebase'; // Import Firestore
import { doc, getDoc, setDoc } from "firebase/firestore"; // Firestore functions
import { useNavigate, useLocation } from 'react-router-dom'; // React Router's useNavigate and useLocation hooks
import '../css/Auth.css'; // Import the CSS file

const Auth = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState(''); // Store email
  const [password, setPassword] = useState(''); // Store password
  const [error, setError] = useState(''); // Store error messages
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Hook for navigating to different routes
  const location = useLocation(); // Hook to get the current location (for previous page)

  const handleLogin = async () => {
    setLoading(true); // Set loading to true while processing the login
    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user exists in Firestore (in the "employees" collection)
      const userDocRef = doc(db, "employees", user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        // If employee data exists, log them in
        setIsLoggedIn(true);
        setError(''); // Reset any error message
        setLoading(false); // Reset loading

        // Redirect to the previous page or dashboard
        const redirectTo = location.state?.from || '/dashboard';
        navigate(redirectTo);
      } else {
        // If the employee does not exist, create a new document for the employee
        await setDoc(userDocRef, {
          email: user.email,
          uid: user.uid,
          createdAt: new Date(),
        });

        // Now the employee is created and logged in
        setIsLoggedIn(true);
        setError(''); // Reset any error message
        setLoading(false); // Reset loading

        // Redirect to the previous page or dashboard
        const redirectTo = location.state?.from || '/dashboard';
        navigate(redirectTo);
      }
    } catch (error) {
      setError('Invalid email or password'); // Display error message
      setLoading(false); // Reset loading
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        {/* Display error message if credentials are wrong */}
        {error && <div className="error-message">{error}</div>}
        <div className="input-group">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="input-group">
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
