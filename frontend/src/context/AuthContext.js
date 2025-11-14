import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); 
  const [showUserEmail, setShowUserEmail] = useState(false);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setShowAuthModal(true); 
    setAuthMode("login"); 
    return signOut(auth);
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      
      if (!user) {
        setShowAuthModal(true);
        setAuthMode("login");
      } else {
        setShowAuthModal(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    register,
    logout,
    googleSignIn,
    showAuthModal,
    setShowAuthModal,
    authMode,
    setAuthMode,
    loading,
    showUserEmail,
    setShowUserEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && (
        <>
          {children}
        </>
      )}
    </AuthContext.Provider>
  );
}