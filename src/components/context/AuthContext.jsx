import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../../services/firebase/firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    },
  (error)=>{
    setAuthError(error.message);
    setAuthLoading(false)
  });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    setAuthError(null)
    try {
      
      await signInWithEmailAndPassword(auth, email, password);
      
    } catch (error) {
      setAuthError(error.message)
      throw error;
      
    }
  
  };

  const logout = async () => {
    setAuthError(null)
try {
    await signOut(auth);
} catch (error) {
  setAuthError(error.message);
  throw error;
}
  };

  const value = {
    currentUser,
    authLoading,
    authError,
    login,
    logout

  }
  return (
    <AuthContext.Provider value={ value }>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);