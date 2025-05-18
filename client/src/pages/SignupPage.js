import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import styles from './AuthPage.module.css'; // Ensure this CSS module exists

function SignupPage() { // The component is named SignupPage
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('customer'); // Default role
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/');
    return null; 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (password.length < 6) {
      return setError("Password should be at least 6 characters long.");
    }

    setLoading(true);
    try {
      signup({ name, email, password, role }); 
      console.log("Mock signup attempted for:", { name, email, role });
      navigate(role === 'seller' ? '/seller/dashboard' : '/'); 
    } catch (err) {
      console.error("Mock signup failed (should not happen with current mock):", err);
      setError("Failed to create an account. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className={styles.authPageContainer}>
      <div className={styles.authFormCard}>
        <h2 className={styles.authTitle}>Create Account</h2>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          {error && <p className={styles.errorMessage}>{error}</p>}

          <div className={styles.formGroup}>
            <label htmlFor="signup-name">Full Name</label>
            <input 
              type="text" 
              id="signup-name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              aria-label="Full Name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="signup-email">Email Address</label>
            <input 
              type="email" 
              id="signup-email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              aria-label="Email Address"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="signup-password">Password</label>
            <input 
              type="password" 
              id="signup-password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              minLength="6"
              aria-label="Password"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="signup-confirm-password">Confirm Password</label>
            <input 
              type="password" 
              id="signup-confirm-password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              minLength="6"
              aria-label="Confirm Password"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Sign up as a:</label>
            <div className={styles.roleSelector}>
              <label className={styles.roleOption}>
                <input 
                  type="radio" 
                  name="role" 
                  value="customer" 
                  checked={role === 'customer'} 
                  onChange={(e) => setRole(e.target.value)} 
                  aria-label="Sign up as Customer"
                /> Customer
              </label>
              <label className={styles.roleOption}>
                <input 
                  type="radio" 
                  name="role" 
                  value="seller" 
                  checked={role === 'seller'} 
                  onChange={(e) => setRole(e.target.value)} 
                  aria-label="Sign up as Seller"
                /> Seller
              </label>
            </div>
          </div>

          <button type="submit" className={styles.authButton} disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className={styles.authRedirect}>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage; // Export the component