import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

// Basic LoadingOverlay component (if you don't have one globally accessible)
// You can replace this with your existing LoadingOverlay import if it's suitable
const LoadingOverlay = ({ isActive }) => {
  if (!isActive) return null;
  // Basic styles, you can make this more sophisticated
  const style = { 
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
    backgroundColor: 'rgba(255,255,255,0.8)', display: 'flex', 
    justifyContent: 'center', alignItems: 'center', zIndex: 9999 
  };
  return (
    <div style={style}>
      <p style={{fontSize: '1.5em', color: '#333'}}>Loading...</p>
    </div>
  );
};


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  const navigate = useNavigate(); // useNavigate can be used here as Router is outside

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to parse saved user from local storage", error);
      localStorage.removeItem('currentUser');
    }
    setLoadingAuthState(false);
  }, []);

  const login = (userData) => {
    // In a real app, userData would likely contain the role from the backend
    const mockUser = {
      email: userData.email,
      name: userData.name || userData.email.split('@')[0], 
      role: userData.role || 'customer', // Role from login form or backend
      token: 'mock-jwt-token-' + Date.now() 
    };
    setCurrentUser(mockUser);
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    console.log('User logged in (mock):', mockUser);
    // Navigate after state update, or let component handle it
    // navigate(mockUser.role === 'seller' ? '/seller/dashboard' : '/');
  };

  const signup = (userData) => {
    const mockUser = {
      name: userData.name,
      email: userData.email,
      role: userData.role,
      token: 'mock-jwt-token-' + Date.now()
    };
    setCurrentUser(mockUser);
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    console.log('User signed up and logged in (mock):', mockUser);
    // Navigate after state update, or let component handle it
    // navigate(mockUser.role === 'seller' ? '/seller/dashboard' : '/');
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    console.log('User logged out');
    navigate('/'); 
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    signup,
    logout,
    loadingAuthState
  };

  if (loadingAuthState) {
    return <LoadingOverlay isActive={true} />; 
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};