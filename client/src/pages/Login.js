import React, { useState } from 'react'; // Added useState
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { useAuth } from '../context/AuthContext'; // Added useAuth
import styles from './AuthPage.module.css'; // Import the shared styles

function Login() {
  // Added state for email, password, loading, and error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get login function and auth state
  const { login, isAuthenticated } = useAuth(); 
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
     // Redirect to a dashboard, account page, or home
     // For now, let's redirect to home
     navigate('/');
     return null; // Don't render the login form if already logged in
  }


  // Added submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic Frontend Validation (can add more if needed)
    if (!email || !password) {
      setLoading(false);
      return setError("Please enter both email and password.");
    }

    try {
      // In a real app, this would be an API call to your backend:
      // const response = await fetch('/api/auth/login', { ... });
      // const data = await response.json(); // This data would include user role
      
      // SIMULATE LOGIN:
      // For mock, we need to simulate getting the user's role.
      // A simple mock might check the email or have a predefined mock user.
      // Let's use a simple check: if email contains 'seller', mock as seller.
      let mockRole = 'customer';
      if (email.includes('seller')) {
         mockRole = 'seller';
      }
      // You might also add a check here to fail mock login if email/pass don't match mock data
      // but for simplicity, we assume valid credentials if email/pass are present.

      login({ email, password, role: mockRole }); // Pass the determined mock role

      console.log("Mock login attempted for:", email, "as", mockRole);

      // Redirect based on mock role after successful mock login
      navigate(mockRole === 'seller' ? '/seller/dashboard' : '/');

    } catch (err) {
       // Handle actual API errors here in a real app
       console.error("Mock login failed (should not happen with current mock):", err);
       setError("Failed to log in. Please check your credentials."); // Generic error message
    }
    setLoading(false);
  };

  return (
    // Apply shared styles from AuthPage.module.css
    <div className={styles.authPageContainer}>
      <div className={styles.authFormCard}>
        <h2 className={styles.authTitle}>Log In to Your Account</h2>
        
        <form onSubmit={handleSubmit} className={styles.authForm}>
          {error && <p className={styles.errorMessage}>{error}</p>} {/* Display errors */}

          <div className={styles.formGroup}>
            <label htmlFor="login-email">Email Address</label>
            <input 
              type="email" 
              id="login-email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required // HTML5 validation
              aria-label="Email Address"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="login-password">Password</label>
            <input 
              type="password" 
              id="login-password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
              aria-label="Password"
            />
          </div>

          <button type="submit" className={styles.authButton} disabled={loading}>
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        <p className={styles.authRedirect}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        {/* Add "Forgot Password?" link here later if needed */}
      </div>
    </div>
  );
}

export default Login; // Ensure component is exported as Login