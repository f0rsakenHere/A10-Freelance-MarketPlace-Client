import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register user with email and password
  const registerUser = async (email, password, name, photoURL = "") => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Update profile with name and photo
      const profileData = { displayName: name };
      if (photoURL) {
        profileData.photoURL = photoURL;
      }
      await updateProfile(result.user, profileData);
      setUser({ ...result.user, displayName: name, photoURL });
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login user with email and password
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login with Google
  const loginWithGoogle = () => {
    setLoading(true);
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  // Logout user
  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Update user profile
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // Observer for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Fetch user role
        // TODO: Replace with backend API call to get user role from database
        const role = getUserRole(currentUser.email);
        setUser({ ...currentUser, role });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Mock role assignment based on email
  // TODO: Replace with actual API call to backend
  const getUserRole = (email) => {
    if (email === "demoadmin@example.com") return "admin";
    if (email === "demouser@example.com") return "user";
    // Default role for all other users
    return "user";
  };

  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    loginWithGoogle,
    logoutUser,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
